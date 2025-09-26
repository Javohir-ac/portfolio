# Render.com Deployment Checklist

## Pre-deployment Requirements

- [ ] GitHub repository with the latest code
- [ ] Telegram bot token from [@BotFather](https://t.me/BotFather)
- [ ] Telegram chat ID (use [@userinfobot](https://t.me/userinfobot) to get it)

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

### 3. Environment Variables

Set these environment variables in the "Environment Variables" section:

| Variable Name        | Description             | Example Value                  |
| -------------------- | ----------------------- | ------------------------------ |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | `123456789:ABCdefGhIJKlmNoPQR` |
| `TELEGRAM_CHAT_ID`   | Your Telegram chat ID   | `123456789`                    |
| `NODE_ENV`           | Environment mode        | `production`                   |
| `PORT`               | Render will set this    | (Automatically set by Render)  |

Note: Render automatically sets the `PORT` environment variable.

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
   - Add your Telegram credentials:
     ```
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     TELEGRAM_CHAT_ID=your_chat_id
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

## Project Structure

```
java-tech-portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── server.js       # Express server
│   ├── .env            # Environment variables (not committed)
│   └── package.json
├── package.json        # Root package.json for deployment
├── DEPLOYMENT_CHECKLIST.md
└── README.md
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Deployment**: Render.com
- **Contact Form**: Telegram Bot API

## Testing the Deployment

### 1. Health Check

- [ ] Visit `YOUR_SITE_URL/health`
- [ ] Should return: `{"status":"OK","timestamp":"ISO_TIMESTAMP","environment":"production"}`

### 2. Frontend Functionality

- [ ] Visit your deployed site URL
- [ ] Check that all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Test navigation between sections

### 3. Contact Form

- [ ] Fill out and submit the contact form
- [ ] Verify that you receive a message on Telegram
- [ ] Check for success message on the frontend

### 4. API Endpoints

- [ ] Test `/api/contact` endpoint with a POST request
- [ ] Verify proper CORS headers are set

## Troubleshooting

### Common Issues

1. **CORS Errors**:

   - Our server.js includes proper CORS headers for API endpoints
   - All API routes are prefixed with `/api`

2. **Telegram Integration Not Working**:

   - Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
   - Check Render logs for error messages
   - Test your bot token and chat ID locally

3. **Routing Issues**:

   - Our server.js handles client-side routing with React Router
   - All non-API routes serve `index.html`

4. **Build Failures**:
   - Check dependencies in `package.json` files
   - Ensure all required build tools are included

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
