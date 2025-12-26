#!/usr/bin/env node

import 'dotenv/config';
import { env } from './config/env.js';
import { startServer } from './server.js';

/**
 * Main entry point for the MCP server
 */
async function main() {
  try {
    // Validate environment variables
    if (!env.MEM_API_KEY) {
      console.error('Error: MEM_API_KEY environment variable is required');
      console.error('Get your API key from https://mem.ai/settings/api');
      process.exit(1);
    }

    // Start the server
    await startServer(env.MEM_API_KEY, env.MEM_API_BASE_URL);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
