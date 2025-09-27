const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs').promises

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Get Telegram configuration from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Rate limiting state file
const PAUSE_STATE_FILE = path.join(__dirname, 'telegramPauseState.json')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/build')))

// Helper function to read pause state
async function readPauseState() {
  try {
    const data = await fs.readFile(PAUSE_STATE_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is invalid, return default state
    return { isPaused: false, pauseEndTime: null }
  }
}

// Helper function to write pause state
async function writePauseState(state) {
  try {
    await fs.writeFile(PAUSE_STATE_FILE, JSON.stringify(state, null, 2))
  } catch (error) {
    // Silently handle write errors
  }
}

// Helper function to send message to Telegram
async function sendToTelegram(message) {
  // Check if we're in a pause period
  const pauseState = await readPauseState()
  if (pauseState.isPaused && Date.now() < pauseState.pauseEndTime) {
    throw new Error('RATE_LIMITED')
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()

    // If we hit rate limits, set a 24-hour pause
    if (response.status === 429) {
      const newPauseState = {
        isPaused: true,
        pauseEndTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
      }
      await writePauseState(newPauseState)
      throw new Error('RATE_LIMITED')
    }

    throw new Error(`Telegram API error: ${errorData.description || response.statusText}`)
  }

  return await response.json()
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Barcha maydonlar to'ldirilishi shart",
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email formati noto'g'ri",
      })
    }

    // Format message for Telegram
    const telegramMessage = `
<b>Yangi xabar</b>
<b>Ism:</b> ${name}
<b>Email:</b> ${email}
<b>Mavzu:</b> ${subject}
<b>Xabar:</b>
${message}
    `.trim()

    // Send to Telegram
    await sendToTelegram(telegramMessage)

    // Success response
    res.json({
      success: true,
      message: "Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.",
    })
  } catch (error) {
    // Handle rate limiting
    if (error.message === 'RATE_LIMITED') {
      return res.status(429).json({
        success: false,
        message:
          "Xabar yuborish vaqtincha cheklangan. Iltimos, keyinroq qayta urinib ko'ring.",
      })
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message:
        "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
    })
  }
})

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

// Start server
app.listen(PORT, () => {})

module.exports = app
