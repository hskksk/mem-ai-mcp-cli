import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printNote } from '../../formatters/note-formatter.js';

export function registerNoteGetCommand(noteCmd: Command, client: MemAPIClient): void {
  noteCmd
    .command('get <id>')
    .description('Get a note by ID')
    .action(async (id: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.getNote(id);
        printNote(result, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
