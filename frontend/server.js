const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const app = express()
const PORT = 3012

// Middleware to parse JSON bodies
app.use(express.json())

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')))

// API route for contact form
app.post('/api/contact', async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, message } = req.body

    console.log('Received contact form data:', { name, email, message })

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and message are required.',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format.',
      })
    }

    // Prepare the message for Telegram
    const telegramMessage = `📩 New message from ${name} (${email}):\n${message}`

    console.log('Prepared Telegram message:', telegramMessage)

    // Telegram bot configuration using environment variables
    const TELEGRAM_BOT_TOKEN =
      process.env.TELEGRAM_BOT_TOKEN || '8207833578:AAHgmssRtb3ovjobC_a8mj7U2cXALptcero'
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6627651432'
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    console.log('Telegram API URL:', TELEGRAM_API_URL)
    console.log('Telegram Chat ID:', TELEGRAM_CHAT_ID)

    // Send message to Telegram bot
    const telegramResponse = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
      }),
    })

    console.log('Telegram API response status:', telegramResponse.status)
    console.log('Telegram API response ok:', telegramResponse.ok)

    // Log response headers for debugging
    console.log('Telegram API response headers:', [...telegramResponse.headers.entries()])

    // Check if the message was sent successfully
    if (telegramResponse.ok) {
      const responseData = await telegramResponse.json()
      console.log('Telegram API response data:', responseData)
      console.log('Message sent successfully to Telegram')
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully to Telegram bot!',
      })
    } else {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return res.status(500).json({
        success: false,
        message: 'Failed to send message to Telegram bot.',
      })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your request.',
    })
  }
})

// New POST route: /send-message
app.post('/send-message', async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, subject, message } = req.body

    console.log('Received send-message data:', { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required.',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format.',
      })
    }

    // Prepare the message for Telegram with the specified format
    const telegramMessage = `✉️ Yangi xabar:\n👤 ${name}\n📧 ${email}\n📝 ${subject}\n💬 ${message}`

    console.log('Prepared Telegram message:', telegramMessage)

    // Telegram bot configuration using environment variables
    const TELEGRAM_TOKEN =
      process.env.TELEGRAM_BOT_TOKEN || '8207833578:AAHgmssRtb3ovjobC_a8mj7U2cXALptcero'
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6627651432'
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

    console.log('Telegram API URL:', TELEGRAM_API_URL)
    console.log('Telegram Chat ID:', CHAT_ID)

    // Send message to Telegram bot
    const telegramResponse = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
      }),
    })

    console.log('Telegram API response status:', telegramResponse.status)
    console.log('Telegram API response ok:', telegramResponse.ok)

    // Log response headers for debugging
    console.log('Telegram API response headers:', [...telegramResponse.headers.entries()])

    // Check if the message was sent successfully
    if (telegramResponse.ok) {
      const responseData = await telegramResponse.json()
      console.log('Telegram API response data:', responseData)
      console.log('Message sent successfully to Telegram')
      return res.status(200).json({
        success: true,
        message: 'Xabar yuborildi!',
      })
    } else {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return res.status(500).json({
        success: false,
        error: 'Failed to send message to Telegram bot.',
      })
    }
  } catch (error) {
    console.error('API Error:', error)
    // More detailed error logging
    if (error.cause) {
      console.error('Error cause:', error.cause)
    }
    return res.status(500).json({
      success: false,
      error:
        'An unexpected error occurred while processing your request: ' + error.message,
    })
  }
})

// For any other routes, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
