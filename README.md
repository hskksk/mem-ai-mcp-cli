# mem.ai MCP Server

[![npm version](https://badge.fury.io/js/@hskksk%2Fmem-ai-mcp-server.svg)](https://www.npmjs.com/package/@hskksk/mem-ai-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Model Context Protocol (MCP) server for [mem.ai](https://mem.ai) API integration. This server enables AI assistants like Claude to interact with your mem.ai memory through a standardized interface.

## Features

- **Complete API Coverage**: All 11 mem.ai API endpoints wrapped as MCP tools
- **TypeScript**: Fully typed with strict mode enabled
- **Easy Integration**: Works seamlessly with Claude Desktop and other MCP clients
- **Error Handling**: Comprehensive error handling with detailed messages
- **Validation**: Input validation using Zod schemas

## Installation

No installation required! You can run the server directly using `npx` (recommended), or install it globally if you prefer.

### Using npx (Recommended)

```bash
npx @hskksk/mem-ai-mcp-server
```

This automatically downloads and runs the latest version without requiring installation.

### Global Installation (Optional)

```bash
npm install -g @hskksk/mem-ai-mcp-server
```

## Configuration

### Get Your API Key

1. Visit [mem.ai settings](https://mem.ai/settings/api)
2. Generate a new API key
3. Copy the key for configuration

### Environment Variables

Create a `.env` file or set environment variables:

```bash
MEM_API_KEY=your_api_key_here
```

Optional configuration:

```bash
# Override the default API base URL (default: https://api.mem.ai)
MEM_API_BASE_URL=https://api.mem.ai
```

## Usage

### With Claude Desktop (Recommended)

Add the following configuration to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mem-ai": {
      "command": "npx",
      "args": ["-y", "@hskksk/mem-ai-mcp-server"],
      "env": {
        "MEM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

After restarting Claude Desktop, you'll be able to use mem.ai tools in your conversations.

### Alternative: Using Global Installation

If you've installed the package globally:

```json
{
  "mcpServers": {
    "mem-ai": {
      "command": "mem-ai-mcp-server",
      "env": {
        "MEM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Standalone Usage

```bash
# Using npx (recommended)
MEM_API_KEY=your_api_key_here npx @hskksk/mem-ai-mcp-server

# Or if installed globally
MEM_API_KEY=your_api_key_here mem-ai-mcp-server
```

## Available Tools

### Mem It

- **`mem_it`** - Remember any content intelligently
  - Primary endpoint for saving information to mem.ai
  - Supports context and instructions for better processing

### Notes Management

- **`create_note`** - Create a new note with markdown content
- **`get_note`** - Retrieve a specific note by ID
- **`delete_note`** - Delete a note
- **`list_notes`** - List all notes
- **`search_notes`** - Search across notes with query, limit, and offset

### Collections Management

- **`create_collection`** - Create a new collection
- **`get_collection`** - Retrieve a specific collection by ID
- **`delete_collection`** - Delete a collection
- **`list_collections`** - List all collections
- **`search_collections`** - Search across collections with query, limit, and offset

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/hskksk/mem-ai-mcp-server.git
cd mem-ai-mcp-server

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Edit .env and add your API key
```

### Development Commands

```bash
# Run in development mode with auto-reload
pnpm dev

# Build the project
pnpm build

# Run tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint
```

### Project Structure

```
src/
├── index.ts              # Entry point
├── server.ts             # MCP server setup
├── config/
│   └── env.ts           # Environment configuration
├── client/
│   └── mem-api-client.ts # mem.ai API client
├── tools/               # MCP tool implementations
│   ├── base-tool.ts
│   ├── mem-it.ts
│   ├── notes/
│   └── collections/
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## API Documentation

For detailed information about the mem.ai API, visit the [official API documentation](https://docs.mem.ai/api-reference/).

## Error Handling

The server provides detailed error messages for common issues:

- **401 Unauthorized**: Invalid API key
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Server Error**: Internal server error

All errors are returned in a structured format for easy debugging.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/hskksk/mem-ai-mcp-server)
- [npm Package](https://www.npmjs.com/package/@hskksk/mem-ai-mcp-server)
- [mem.ai Website](https://mem.ai)
- [MCP Documentation](https://modelcontextprotocol.io)

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/hskksk/mem-ai-mcp-server/issues)
2. Create a new issue with detailed information
3. Refer to the [mem.ai API documentation](https://docs.mem.ai/api-reference/)

## Changelog

### 0.1.1

- Fixed test script to use `--import` instead of deprecated `--loader` flag
- Updated README to recommend `npx` usage for easier setup
- Improved Claude Desktop configuration examples

### 0.1.0 (Initial Release)

- Complete implementation of all 11 mem.ai API endpoints
- TypeScript support with full type definitions
- Comprehensive error handling
- Input validation using Zod
- Basic unit tests
- Claude Desktop integration support
