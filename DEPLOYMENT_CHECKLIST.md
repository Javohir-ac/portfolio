# Render.com Deployment Checklist

## Pre-deployment Requirements

- [ ] GitHub repository with the latest code
- [ ] Telegram bot token from [@BotFather](https://t.me/BotFather)
- [ ] Telegram chat ID (use [@userinfobot](https://t.me/userinfobot) to get it)
- [ ] Gmail account for email notifications

## Render.com Setup Steps

### 1. Create Web Service

- [ ] Log in to [Render Dashboard](https://dashboard.render.com/)
- [ ] Click "New" → "Web Service"
- [ ] Connect your GitHub repository

### 2. Configure Service Settings

- [ ] **Name**: Choose a name for your service
- [ ] **Region**: Select the region closest to your users
- [ ] **Branch**: Select the branch to deploy (usually `main` or `master`)
- [ ] **Root Directory**: Leave empty (root of repository)
- [ ] **Runtime**: Node
- [ ] **Build Command**: `npm run build`
- [ ] **Start Command**: `npm start`
- [ ] **Instance Type**: Choose based on your needs (Free tier available)

### 3. Environment Variables

Set these environment variables in the "Environment Variables" section:

| Variable Name             | Description               | Example Value                   |
| ------------------------- | ------------------------- | ------------------------------- |
| `TELEGRAM_BOT_TOKEN`      | Your Telegram bot token   | `123456789:ABCdefGhIJKlmNoPQR`  |
| `TELEGRAM_CHAT_ID`        | Your Telegram chat ID     | `123456789`                     |
| `EMAIL_USER`              | Your Gmail address        | `your-email@gmail.com`          |
| `EMAIL_PASS`              | Your Gmail app password   | `your-app-password`             |
| `FRONTEND_URL`            | Your deployed URL         | `https://your-app.onrender.com` |
| `TELEGRAM_FAIL_THRESHOLD` | (Optional) Fail threshold | `1`                             |
| `TELEGRAM_PAUSE_HOURS`    | (Optional) Pause duration | `24`                            |
| `NODE_ENV`                | Environment mode          | `production`                    |
| `PORT`                    | Render will set this      | (Automatically set by Render)   |

Note:

- For `EMAIL_PASS`, use an [App Password](https://support.google.com/accounts/answer/185833) if you have 2FA enabled
- Render automatically sets the `PORT` environment variable

### 4. Advanced Settings (Optional)

- [ ] **Auto-Deploy**: Enable if you want automatic deployments on pushes
- [ ] **Health Check Path**: `/health`
- [ ] **Instance Type**: Choose based on your needs (Free tier available)

### 5. Deploy

- [ ] Click "Create Web Service"
- [ ] Wait for the build and deployment to complete
- [ ] Check the logs for any errors

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd java-tech-portfolio
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Configure environment variables:

   - Edit the `.env` file in the `frontend` directory
   - Add your credentials:
     ```
     PORT=3010
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     TELEGRAM_CHAT_ID=your_chat_id
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     TELEGRAM_FAIL_THRESHOLD=1
     TELEGRAM_PAUSE_HOURS=24
     ```

4. Build the React frontend:

   ```bash
   npm run build
   ```

5. Start the backend server:

   ```bash
   npm run server
   ```

6. For development with hot reloading:
   - Terminal 1: `npm start` (frontend)
   - Terminal 2: `npm run server` (backend)

## Testing the Deployment

### 1. Health Check

- [ ] Visit `YOUR_SITE_URL/health`
- [ ] Should return detailed status information including Telegram pause state

### 2. Frontend Functionality

- [ ] Visit your deployed site URL
- [ ] Check that all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Test navigation between sections

### 3. Contact Form - Telegram Test

- [ ] Fill out and submit the contact form
- [ ] Verify that you receive a message on Telegram
- [ ] Check for success message on the frontend

### 4. Contact Form - Email Fallback Test

To test the email fallback:

1. Temporarily invalidate your Telegram bot token
2. Submit a contact form
3. Verify that you receive an email notification
4. Check the `/health` endpoint to confirm Telegram is paused

### 5. Rate Limiting Test

- [ ] Submit multiple contact forms quickly
- [ ] Verify that you get a rate limiting error after the first submission

### 6. Pause State Verification

- [ ] Check the `/health` endpoint for Telegram pause state
- [ ] After triggering the pause mechanism, verify that subsequent messages go to email

## Project Structure

```
java-tech-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── server.js          # Express server with Telegram/email integration
│   ├── rateLimiter.js     # Rate limiting implementation
│   ├── telegramPauseState.json  # Telegram pause state (auto-generated)
│   ├── .env               # Environment variables (not committed)
│   └── package.json
├── package.json           # Root package.json for deployment
├── DEPLOYMENT_CHECKLIST.md
└── README.md
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Messaging**: Telegram Bot API, Nodemailer
- **Deployment**: Render.com
- **Security**: Rate limiting, environment variables

## Troubleshooting

### Common Issues

1. **Telegram Integration Not Working**:

   - Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
   - Check Render logs for error messages
   - Test your bot token and chat ID locally

2. **Email Fallback Not Working**:

   - Verify `EMAIL_USER` and `EMAIL_PASS` environment variables
   - Ensure you're using an App Password if you have 2FA enabled
   - Check spam folder for emails

3. **Rate Limiting Issues**:

   - The rate limiter allows 1 request per 30 seconds per IP
   - For testing, you can modify the rate limiter in `rateLimiter.js`

4. **Telegram Pause State**:
   - Pause state is stored in `telegramPauseState.json`
   - If you need to manually reset the pause, delete this file

### Checking Logs

- [ ] Go to your Render service dashboard
- [ ] Click "Logs" to view real-time logs
- [ ] Look for any error messages during build or runtime

## Post-Deployment Verification

- [ ] Visit your deployed site URL
- [ ] Test the contact form submission
- [ ] Verify Telegram messages are received
- [ ] Check that all pages load correctly
- [ ] Confirm mobile responsiveness

## Scaling and Monitoring

- [ ] Set up custom domain (optional)
- [ ] Configure SSL (automatically provided by Render)
- [ ] Set up alerts for downtime (Render Pro feature)
- [ ] Monitor usage and performance

## Updates and Maintenance

To update your site:

1. Push changes to your connected GitHub repository
2. Render will automatically deploy if auto-deploy is enabled
3. Or manually trigger a deploy from the Render dashboard

For manual deployment:

- [ ] Go to your service dashboard
- [ ] Click "Manual Deploy"
- [ ] Select "Clear build cache & deploy"
