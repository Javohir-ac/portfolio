const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

// Get port from environment variable or default to 5000
const PORT = process.env.PORT || 5000

// Middleware to parse JSON bodies
app.use(express.json())

// Serve React production build
app.use(express.static(path.join(__dirname, 'build')))

// CORS middleware for API endpoints
app.use('/api', (req, res, next) => {
  // Allow all origins in development, specific origin in production
  const allowedOrigin =
    process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL || '*' : '*'

  res.header('Access-Control-Allow-Origin', allowedOrigin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    return res.status(200).json({})
  }

  next()
})

// Example API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' })
    }

    // Create message for Telegram
    const telegramMessage = `📩 New message from portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`

    // Get Telegram credentials from environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    // Check if Telegram credentials are provided
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not provided')
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.',
      })
    }

    // Send message to Telegram
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    })

    if (telegramResponse.ok) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
      })
    } else {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      })
    }
  } catch (error) {
    console.error('Server error in /api/contact:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    })
  }
})

// For client-side routing, serve index.html for all non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Telegram Bot Token configured: ${!!process.env.TELEGRAM_BOT_TOKEN}`)
  console.log(`Telegram Chat ID configured: ${!!process.env.TELEGRAM_CHAT_ID}`)
})
