import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError, confirm } from '../../utils.js';
import { printNoteDeleted } from '../../formatters/note-formatter.js';

export function registerNoteDeleteCommand(noteCmd: Command, client: MemAPIClient): void {
  noteCmd
    .command('delete <id>')
    .description('Delete a note')
    .option('--force', 'Skip confirmation prompt')
    .action(async (id: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        if (!options.force) {
          const ok = await confirm(`Delete note ${id}?`);
          if (!ok) {
            console.log('Cancelled.');
            process.exit(0);
          }
        }

        await client.deleteNote(id);
        printNoteDeleted(id, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
