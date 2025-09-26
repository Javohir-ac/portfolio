const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs').promises

// Load environment variables from .env file with proper path resolution
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()

// Get port from environment variable or default to 3010
const PORT = process.env.PORT || 3010

// Get configuration from environment variables
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const TELEGRAM_FAIL_THRESHOLD = parseInt(process.env.TELEGRAM_FAIL_THRESHOLD) || 1
const TELEGRAM_PAUSE_HOURS = parseInt(process.env.TELEGRAM_PAUSE_HOURS) || 24

// Log configuration on startup
console.log('Server Configuration:')
console.log('- PORT:', PORT)
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development')
console.log('- TELEGRAM_CHAT_ID configured:', !!TELEGRAM_CHAT_ID)

// Middleware to parse JSON bodies
app.use(express.json())

// CORS configuration for frontend on port 5000
const allowedOrigin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // React dev server porti
    : process.env.FRONTEND_URL || '*'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// Load Telegram pause state
async function loadTelegramPauseState() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'telegramPauseState.json'),
      'utf8'
    )
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is corrupted, return default state
    return {
      isPaused: false,
      pauseEndTime: null,
      failedAttempts: 0,
    }
  }
}

// Save Telegram pause state
async function saveTelegramPauseState(state) {
  try {
    await fs.writeFile(
      path.join(__dirname, 'telegramPauseState.json'),
      JSON.stringify(state, null, 2)
    )
  } catch (error) {
    console.error('Failed to save Telegram pause state:', error)
  }
}

// Check if Telegram is paused
async function isTelegramPaused() {
  const state = await loadTelegramPauseState()

  // If paused, check if pause period has expired
  if (state.isPaused && state.pauseEndTime) {
    const now = new Date().getTime()
    const pauseEndTime = new Date(state.pauseEndTime).getTime()

    if (now > pauseEndTime) {
      // Pause period expired, resume Telegram
      state.isPaused = false
      state.pauseEndTime = null
      await saveTelegramPauseState(state)
      return { isPaused: false, failedAttempts: state.failedAttempts }
    }

    // Still in pause period
    return { isPaused: true, failedAttempts: state.failedAttempts }
  }

  return { isPaused: state.isPaused, failedAttempts: state.failedAttempts }
}

// Send message to Telegram chat
async function sendTelegramMessage(message) {
  try {
    // Check if Telegram Chat ID is configured
    if (!TELEGRAM_CHAT_ID) {
      throw new Error('Telegram Chat ID not configured')
    }

    // Check if TELEGRAM_BOT_TOKEN is configured
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('Telegram Bot Token not configured')
    }

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.ok) {
      // Check if it's a rate limit error
      if (result.error_code === 429) {
        throw new Error('Rate limit exceeded')
      }
      throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`)
    }

    console.log('Telegram message sent successfully')
    return { success: true, result }
  } catch (error) {
    console.error('Telegram sending failed:', error.message)
    throw error
  }
}

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate required fields (Uzbek language)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, barcha maydonlarni to‘ldiring.',
      })
    }

    // Validate email format (Uzbek language)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, to‘g‘ri email manzil kiriting.',
      })
    }

    // Create message for Telegram
    const telegramMessage = `📩 *Yangi xabar portfolio veb-saytingizdan:*\n\n*Ism:* ${name}\n*Email:* ${email}\n*Mavzu:* ${subject}\n*Xabar:* ${message}`

    // Check if Telegram is paused due to rate limiting
    const pauseState = await isTelegramPaused()

    if (pauseState.isPaused) {
      // Telegram is paused, return error to user
      console.log(
        "Telegramga xabar yuborish to'xtatildi va 24soatdan keyin yana ochiladi"
      )
      return res.status(429).json({
        success: false,
        message: 'Kutilmagan xatolik yuz berdi, keyinroq qayta urinib ko‘ring.',
      })
    }

    // Try to send via Telegram
    try {
      const telegramResult = await sendTelegramMessage(telegramMessage)

      if (telegramResult.success) {
        // Success response (Uzbek language)
        return res.status(200).json({
          success: true,
          message: 'Xabar yuborildi! Tez orada siz bilan bog‘lanamiz.',
        })
      } else {
        throw new Error('Telegram message was not sent successfully')
      }
    } catch (telegramError) {
      console.error('Telegram sending failed:', telegramError.message)

      // Increment failed attempts
      const state = await loadTelegramPauseState()
      state.failedAttempts += 1

      // Check if we should pause Telegram due to rate limiting
      if (state.failedAttempts >= TELEGRAM_FAIL_THRESHOLD) {
        // Pause Telegram for specified hours
        const pauseEndTime = new Date()
        pauseEndTime.setHours(pauseEndTime.getHours() + TELEGRAM_PAUSE_HOURS)

        state.isPaused = true
        state.pauseEndTime = pauseEndTime.toISOString()

        console.log(
          `Telegramga xabar yuborish to'xtatildi va ${TELEGRAM_PAUSE_HOURS} soatdan keyin yana ochiladi`
        )
      }

      await saveTelegramPauseState(state)

      // Return the actual error to the user
      return res.status(500).json({
        success: false,
        message: 'Kutilmagan xatolik yuz berdi, keyinroq qayta urinib ko‘ring.',
      })
    }
  } catch (error) {
    console.error('Server error in /api/contact:', error)
    return res.status(500).json({
      success: false,
      message: 'Kutilmagan xatolik yuz berdi, keyinroq qayta urinib ko‘ring.',
    })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
  })
})

// Start server on configured port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📱 Telegram Chat ID configured: ${!!TELEGRAM_CHAT_ID}`)
  console.log(
    `⏰ Telegram will be paused for ${TELEGRAM_PAUSE_HOURS} hours after ${TELEGRAM_FAIL_THRESHOLD} failed attempts`
  )
})
