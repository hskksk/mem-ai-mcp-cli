# mem-ai CLI

[![npm version](https://badge.fury.io/js/@hskksk%2Fmem-ai-cli.svg)](https://www.npmjs.com/package/@hskksk/mem-ai-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Command-line interface for [mem.ai](https://mem.ai) API.

## Installation

```bash
npm install -g @hskksk/mem-ai-cli
```

Or use without installing:

```bash
npx @hskksk/mem-ai-cli <command>
```

## Configuration

Get your API key from [mem.ai settings](https://mem.ai/settings/api) and set it as an environment variable:

```bash
export MEM_API_KEY=your_api_key_here
```

Or pass it directly with the `--api-key` flag:

```bash
mem-ai --api-key your_api_key_here note list
```

Optionally, override the API base URL:

```bash
export MEM_API_BASE_URL=https://api.mem.ai
```

## Usage

```
mem-ai [options] <command>
```

### Global Options

| Option | Description |
|--------|-------------|
| `--api-key <key>` | API key (overrides `MEM_API_KEY` env var) |
| `--json` | Output as JSON |
| `-V, --version` | Show version |
| `-h, --help` | Show help |

### Commands

#### Mem It

```bash
mem-ai mem-it <text> [options]
```

| Option | Description |
|--------|-------------|
| `--instructions <text>` | Processing instructions |
| `--context <text>` | Background context |
| `--timestamp <iso>` | ISO 8601 timestamp |

#### Notes

```bash
mem-ai note list [options]
mem-ai note get <id>
mem-ai note create [options]
mem-ai note delete <id> [--force]
mem-ai note search [query] [options]
```

**`note list` options:**

| Option | Description |
|--------|-------------|
| `--limit <n>` | Number of notes (1-100) |
| `--page <cursor>` | Pagination cursor |
| `--order-by <field>` | `created_at` \| `updated_at` |
| `--collection-id <uuid>` | Filter by collection |
| `--open-tasks` | Only notes with open tasks |
| `--tasks` | Only notes with tasks |
| `--images` | Only notes with images |
| `--files` | Only notes with files |
| `--with-content` | Include note content in response |

**`note create` options:**

| Option | Description |
|--------|-------------|
| `--content <text>` | Markdown content |
| `--file <path>` | Read content from file (`-` for stdin) |
| `--collection-id <uuid>` | Add to collection by ID (repeatable) |
| `--collection-title <title>` | Add to collection by title (repeatable) |
| `--id <uuid>` | Specify note ID |
| `--created-at <iso>` | Creation timestamp (ISO 8601) |

**`note search` options:**

| Option | Description |
|--------|-------------|
| `--collection-id <uuid>` | Filter by collection ID (repeatable) |
| `--open-tasks` | Only notes with open tasks |
| `--tasks` | Only notes with tasks |
| `--images` | Only notes with images |
| `--files` | Only notes with files |
| `--include-snippet` | Include snippet in results |
| `--include-content` | Include full content in results |

#### Collections

```bash
mem-ai collection list [options]
mem-ai collection get <id>
mem-ai collection create <title> [--description <text>]
mem-ai collection delete <id> [--force]
mem-ai collection search [query] [--include-description]
```

**`collection list` options:**

| Option | Description |
|--------|-------------|
| `--limit <n>` | Number of collections (1-100) |
| `--page <cursor>` | Pagination cursor |
| `--order-by <field>` | `created_at` \| `updated_at` |

## Examples

```bash
# Send text to mem.ai
mem-ai mem-it "Remember to review the Q1 roadmap"
mem-ai mem-it "Task complete" --instructions "Mark as done"

# List notes
mem-ai note list
mem-ai note list --limit 10 --order-by updated_at --json

# Get a specific note
mem-ai note get <note-id>

# Create a note from text
mem-ai note create --content "# Meeting Notes\n\n- Item 1"

# Create a note from a file
mem-ai note create --file meeting.md

# Create a note from stdin
cat meeting.md | mem-ai note create --file -

# Add a note to a collection
mem-ai note create --file note.md --collection-title "Work"

# Delete a note (prompts for confirmation)
mem-ai note delete <note-id>
mem-ai note delete <note-id> --force

# Search notes
mem-ai note search "roadmap"
mem-ai note search --open-tasks

# Manage collections
mem-ai collection list
mem-ai collection create "Work" --description "Work related notes"
mem-ai collection get <collection-id>
mem-ai collection search "work"
mem-ai collection delete <collection-id> --force
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm

### Setup

```bash
git clone https://github.com/hskksk/mem-ai-cli.git
cd mem-ai-cli
pnpm install
```

### Commands

```bash
pnpm dev         # Run in development mode (with auto-reload)
pnpm build       # Build
pnpm test        # Run tests
pnpm type-check  # Type check
pnpm lint        # Lint
```

### Project Structure

```
src/
├── cli.ts                      # Entry point
├── client/
│   └── mem-api-client.ts       # mem.ai API client
├── cli/
│   ├── commands/               # Command implementations
│   │   ├── mem-it.ts
│   │   ├── note/
│   │   └── collection/
│   ├── formatters/             # Output formatters
│   │   ├── note-formatter.ts
│   │   └── collection-formatter.ts
│   └── utils.ts
├── types/
│   └── api.ts                  # API type definitions
└── utils/
    └── error-handler.ts        # Error classes
```

## Error Handling

- **401 Unauthorized**: Invalid API key
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Server Error**: Internal server error

Errors are written to stderr. Use `--json` for machine-readable error output.

## API Documentation

See the [mem.ai API documentation](https://docs.mem.ai/api-reference/).

## License

MIT - see [LICENSE](LICENSE).

## Links

- [GitHub Repository](https://github.com/hskksk/mem-ai-cli)
- [npm Package](https://www.npmjs.com/package/@hskksk/mem-ai-cli)
- [mem.ai Website](https://mem.ai)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.
