/**
 * Base error class for mem.ai API errors
 */
export class MemAPIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'MemAPIError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for parameter validation failures
 */
export class ValidationError extends Error {
  constructor(message: string, public issues?: unknown) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for authentication failures (401)
 */
export class AuthenticationError extends MemAPIError {
  constructor(message: string = 'Invalid API key') {
    super(401, message);
    this.name = 'AuthenticationError';
  }
}

/**
 * Error for resource not found (404)
 */
export class NotFoundError extends MemAPIError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

/**
 * Error for rate limiting (429)
 */
export class RateLimitError extends MemAPIError {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number
  ) {
    super(429, message);
    this.name = 'RateLimitError';
  }
}

/**
 * Error for server errors (500+)
 */
export class ServerError extends MemAPIError {
  constructor(message: string = 'Internal server error') {
    super(500, message);
    this.name = 'ServerError';
  }
}
