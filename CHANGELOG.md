# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-09-26

### Added

- Email fallback mechanism for contact form submissions
- Telegram pause functionality to handle API failures
- Rate limiting to prevent spam submissions
- Retry logic with exponential backoff for Telegram messages
- Health check endpoint with detailed status information
- Telegram pause state persistence
- Rate limiter implementation

### Changed

- Enhanced server.js with comprehensive error handling
- Improved CORS configuration for both development and production
- Updated contact form validation with Uzbek language messages
- Enhanced error messages to be user-friendly in Uzbek
- Improved environment variable handling
- Added nodemailer dependency for email functionality
- Updated package.json files to include new dependencies

### Fixed

- Telegram message sending with proper retry logic
- Email fallback when Telegram fails
- Rate limiting to prevent abuse
- Pause mechanism for handling Telegram API failures
- Proper environment variable loading for both local and production

### Security

- Added rate limiting to prevent spam
- Secure handling of credentials (no logging of sensitive data)
- Proper CORS configuration

## [1.0.0] - 2025-09-26

### Added

- Initial project structure
- React + TypeScript frontend
- Express server with Telegram integration
- Basic contact form functionality
- Deployment configuration for Render.com

### Changed

- Enhanced server.js for better environment handling
- Improved documentation with deployment instructions
- Added dotenv support for local development
