import type { Command } from 'commander';
import type { MemAPIClient } from '../../client/mem-api-client.js';
import { handleError } from '../utils.js';

export function registerMemItCommand(program: Command, client: MemAPIClient): void {
  program
    .command('mem-it <text>')
    .description('Send text to mem.ai for intelligent processing')
    .option('--instructions <text>', 'Processing instructions')
    .option('--context <text>', 'Background context')
    .option('--timestamp <iso>', 'ISO 8601 timestamp')
    .action(async (text: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.memIt({
          input: text,
          instructions: options.instructions,
          context: options.context,
          timestamp: options.timestamp,
        });

        if (json) {
          process.stdout.write(JSON.stringify(result) + '\n');
        } else {
          console.log('Sent to mem.ai successfully');
          console.log(`  Request ID: ${result.request_id}`);
        }
      } catch (error) {
        handleError(error, json);
      }
    });
}
