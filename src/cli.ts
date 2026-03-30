#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { MemAPIClient } from './client/mem-api-client.js';
import { registerMemItCommand } from './cli/commands/mem-it.js';
import { registerNoteCommands } from './cli/commands/note/index.js';
import { registerCollectionCommands } from './cli/commands/collection/index.js';

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
) as { version: string };

const program = new Command();

program
  .name('mem-ai')
  .description('CLI tool for mem.ai API')
  .version(version)
  .option('--api-key <key>', 'API key (overrides MEM_API_KEY env var)')
  .option('--json', 'Output as JSON');

// Pre-parse to handle --api-key before building the client
const { operands: _operands, unknown: _unknown } = program.parseOptions(process.argv.slice(2));
const preOpts = program.opts<{ apiKey?: string }>();
if (preOpts.apiKey) {
  process.env.MEM_API_KEY = preOpts.apiKey;
}

// Allow --help / --version without requiring an API key
const helpArgs = ['--help', '-h', '--version', '-V'];
const isHelpOrVersion = process.argv.slice(2).some(arg => helpArgs.includes(arg));

const apiKey = process.env.MEM_API_KEY;
if (!apiKey && !isHelpOrVersion) {
  process.stderr.write('Error: MEM_API_KEY environment variable is required\n');
  process.stderr.write('  Set it with: export MEM_API_KEY=your_api_key\n');
  process.stderr.write('  Or use the --api-key flag\n');
  process.exit(1);
}

const baseURL = process.env.MEM_API_BASE_URL || 'https://api.mem.ai';
const client = new MemAPIClient(apiKey ?? '', baseURL);

registerMemItCommand(program, client);
registerNoteCommands(program, client);
registerCollectionCommands(program, client);

program.parse();
