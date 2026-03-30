# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-03-30

### Changed

- **BREAKING**: Converted from MCP server to standalone CLI tool
- Package renamed from `@hskksk/mem-ai-mcp-server` to `@hskksk/mem-ai-cli`
- Binary renamed from `mem-ai-mcp-server` to `mem-ai`

### Added

- CLI interface with `commander` for all 11 mem.ai API endpoints
- Human-readable output by default; `--json` flag for JSON output
- `--api-key` global flag to pass API key without environment variable
- `--force` flag on `delete` commands to skip confirmation prompt
- `note create --file <path>` to read content from file or stdin (`-`)
- `note create --collection-id` / `--collection-title` repeatable flags

### Removed

- MCP server implementation
- `dotenv` dependency (use shell environment variables instead)
- `zod` dependency
- `@modelcontextprotocol/sdk` dependency
- `zod-to-json-schema` dependency

## [0.2.0] - 2026-01-12

### Added

- Complete API alignment with official Mem.ai v2 specification
- List Notes: 9 new parameters including pagination, filtering, and sorting
  - `limit`, `page`, `order_by`, `collection_id`
  - `contains_open_tasks`, `contains_tasks`, `contains_images`, `contains_files`
  - `include_note_content`
- Search Notes: 6 filter parameters and config object
  - `filter_by_collection_ids`, `filter_by_contains_open_tasks`
  - `filter_by_contains_tasks`, `filter_by_contains_images`
  - `filter_by_contains_files`, `config`
- List Collections: Pagination and sorting support
  - `limit`, `page`, `order_by`
- Search Collections: Config support for response customization
- Cursor-based pagination with `page` and `next_page` fields
- Advanced filtering by tasks, images, files, and collections
- Enhanced response fields: `request_id`, `next_page`, `title`, `snippet`
- Comprehensive parameter documentation in README

### Changed

- **BREAKING**: Response structures updated (`notes` → `results`, `collections` → `results`)
- **BREAKING**: Search operations now have optional `query` parameter instead of required
- **BREAKING**: Pagination changed from offset-based to cursor-based

### Removed

- **BREAKING**: Non-standard `limit` and `offset` parameters from search operations

## [0.1.1] - 2024-01-XX

### Fixed

- Test script updated to use `--import` instead of deprecated `--loader` flag

### Changed

- Updated README to recommend `npx` usage for easier setup
- Improved Claude Desktop configuration examples

## [0.1.0] - 2024-01-XX

### Added

- Complete implementation of all 11 mem.ai API endpoints
- TypeScript support with full type definitions
- Comprehensive error handling
- Input validation using Zod
- Basic unit tests
- Claude Desktop integration support
