import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError, confirm } from '../../utils.js';
import { printCollectionDeleted } from '../../formatters/collection-formatter.js';

export function registerCollectionDeleteCommand(collectionCmd: Command, client: MemAPIClient): void {
  collectionCmd
    .command('delete <id>')
    .description('Delete a collection')
    .option('--force', 'Skip confirmation prompt')
    .action(async (id: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        if (!options.force) {
          const ok = await confirm(`Delete collection ${id}?`);
          if (!ok) {
            console.log('Cancelled.');
            process.exit(0);
          }
        }

        await client.deleteCollection(id);
        printCollectionDeleted(id, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
