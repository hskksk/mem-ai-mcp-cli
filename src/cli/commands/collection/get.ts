import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printCollection } from '../../formatters/collection-formatter.js';

export function registerCollectionGetCommand(collectionCmd: Command, client: MemAPIClient): void {
  collectionCmd
    .command('get <id>')
    .description('Get a collection by ID')
    .action(async (id: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.getCollection(id);
        printCollection(result, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
