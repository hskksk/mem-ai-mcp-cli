import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printCollectionSearchResults } from '../../formatters/collection-formatter.js';

export function registerCollectionSearchCommand(collectionCmd: Command, client: MemAPIClient): void {
  collectionCmd
    .command('search [query]')
    .description('Search collections')
    .option('--include-description', 'Include description in results')
    .action(async (query: string | undefined, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.searchCollections({
          query,
          config: options.includeDescription ? { include_description: true } : undefined,
        });

        printCollectionSearchResults(result.results, result.total, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
