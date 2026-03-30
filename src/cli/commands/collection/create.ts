import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printCollectionCreated } from '../../formatters/collection-formatter.js';

export function registerCollectionCreateCommand(collectionCmd: Command, client: MemAPIClient): void {
  collectionCmd
    .command('create <title>')
    .description('Create a new collection')
    .option('--description <text>', 'Collection description')
    .action(async (title: string, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.createCollection({
          title,
          description: options.description,
        });

        printCollectionCreated(result, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
