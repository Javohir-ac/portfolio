const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs').promises
const cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3010

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
const TELEGRAM_FAIL_THRESHOLD = parseInt(process.env.TELEGRAM_FAIL_THRESHOLD) || 1
const TELEGRAM_PAUSE_HOURS = parseInt(process.env.TELEGRAM_PAUSE_HOURS) || 24
const TELEGRAM_STATE_FILE = path.join(__dirname, 'telegramPauseState.json')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend/build')))

// Telegram pause state helpers
async function loadTelegramPauseState() {
  try {
    const data = await fs.readFile(TELEGRAM_STATE_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return { isPaused: false, pauseEndTime: null, failedAttempts: 0 }
  }
}

async function saveTelegramPauseState(state) {
  try {
    await fs.writeFile(TELEGRAM_STATE_FILE, JSON.stringify(state, null, 2))
  } catch (error) {
    console.error('Failed to save Telegram pause state:', error)
  }
}

async function isTelegramPaused() {
  const state = await loadTelegramPauseState()
  if (state.isPaused && state.pauseEndTime) {
    const now = Date.now()
    const pauseEndTime = new Date(state.pauseEndTime).getTime()
    if (now > pauseEndTime) {
      state.isPaused = false
      state.pauseEndTime = null
      await saveTelegramPauseState(state)
      return { isPaused: false, failedAttempts: state.failedAttempts }
    }
    return { isPaused: true, failedAttempts: state.failedAttempts }
  }
  return { isPaused: state.isPaused, failedAttempts: state.failedAttempts }
}

async function sendTelegramMessage(message) {
  if (!TELEGRAM_CHAT_ID || !TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram configuration missing')
  }

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    }
  )
  const result = await response.json()
  if (!response.ok || !result.ok) throw new Error(result.description || 'Telegram error')
  return result
}

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Iltimos, barcha maydonlarni to‘ldiring.',
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Iltimos, to‘g‘ri email manzil kiriting.' })
    }

    const telegramMessage = `📩 *Yangi xabar portfolio veb-saytingizdan:*\n\n*Ism:* ${name}\n*Email:* ${email}\n*Mavzu:* ${subject}\n*Xabar:* ${message}`

    const pauseState = await isTelegramPaused()
    if (pauseState.isPaused) {
      return res.status(429).json({ success: false, message: 'Xabar yuborish vaqtincha cheklangan. Keyinroq qayta urinib ko‘ring.' })
    }

    try {
      await sendTelegramMessage(telegramMessage)
      return res.status(200).json({ success: true, message: 'Xabar yuborildi! Tez orada siz bilan bog‘lanamiz.' })
    } catch (err) {
      console.error('Telegram error:', err.message)
      const state = await loadTelegramPauseState()
      state.failedAttempts += 1
      if (state.failedAttempts >= TELEGRAM_FAIL_THRESHOLD) {
        const pauseEndTime = new Date()
        pauseEndTime.setHours(pauseEndTime.getHours() + TELEGRAM_PAUSE_HOURS)
        state.isPaused = true
        state.pauseEndTime = pauseEndTime.toISOString()
        console.log(`Telegram xabar yuborish to'xtatildi. ${TELEGRAM_PAUSE_HOURS} soatdan keyin yana ochiladi`)
      }
      await saveTelegramPauseState(state)
      return res.status(500).json({ success: false, message: 'Kutilmagan xatolik yuz berdi, keyinroq qayta urinib ko‘ring.' })
    }
  } catch (error) {
    console.error('Server error in /api/contact:', error)
    return res.status(500).json({ success: false, message: 'Kutilmagan xatolik yuz berdi, keyinroq qayta urinib ko‘ring.' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), port: PORT })
})

// Serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Telegram Chat ID configured: ${!!TELEGRAM_CHAT_ID}`)
})

module.exports = app
