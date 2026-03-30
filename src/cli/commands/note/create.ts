import { readFileSync } from 'fs';
import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printNoteCreated } from '../../formatters/note-formatter.js';

export function registerNoteCreateCommand(noteCmd: Command, client: MemAPIClient): void {
  noteCmd
    .command('create')
    .description('Create a new note')
    .option('--content <text>', 'Note content (Markdown)')
    .option('--file <path>', 'Read content from file (use - for stdin)')
    .option('--collection-id <uuid>', 'Add to collection by ID (repeatable)', collect, [])
    .option('--collection-title <title>', 'Add to collection by title (repeatable)', collect, [])
    .option('--id <uuid>', 'Specify note ID')
    .option('--created-at <iso>', 'Creation timestamp (ISO 8601)')
    .action(async (options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        let content: string;

        if (options.file) {
          if (options.file === '-') {
            content = readFileSync(0, 'utf8');
          } else {
            content = readFileSync(options.file, 'utf8');
          }
        } else if (options.content) {
          content = options.content;
        } else {
          process.stderr.write('Error: --content or --file is required\n');
          process.exit(1);
        }

        const result = await client.createNote({
          content,
          id: options.id,
          collection_ids: options.collectionId.length > 0 ? options.collectionId : undefined,
          collection_titles: options.collectionTitle.length > 0 ? options.collectionTitle : undefined,
          created_at: options.createdAt,
        });

        printNoteCreated(result, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}

function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}
