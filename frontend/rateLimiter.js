// Simple in-memory rate limiter
class RateLimiter {
  constructor() {
    this.requests = new Map()
  }

  // Check if the IP is allowed to make a request
  isAllowed(ip) {
    const now = Date.now()
    const windowStart = now - 30000 // 30 seconds window

    // Clean up old requests
    for (const [storedIp, timestamps] of this.requests.entries()) {
      this.requests.set(
        storedIp,
        timestamps.filter(timestamp => timestamp > windowStart)
      )
    }

    const userRequests = this.requests.get(ip) || []

    // Allow maximum 1 request per 30 seconds
    if (userRequests.length >= 1) {
      return false
    }

    // Add current request
    userRequests.push(now)
    this.requests.set(ip, userRequests)

    return true
  }
}

module.exports = RateLimiter
