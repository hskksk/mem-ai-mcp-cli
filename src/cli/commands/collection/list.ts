import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printCollectionList } from '../../formatters/collection-formatter.js';

export function registerCollectionListCommand(collectionCmd: Command, client: MemAPIClient): void {
  collectionCmd
    .command('list')
    .description('List all collections')
    .option('--limit <n>', 'Number of collections to return (1-100)', parseInt)
    .option('--page <cursor>', 'Pagination cursor')
    .option('--order-by <field>', 'Sort order: created_at | updated_at')
    .action(async (options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.listCollections({
          limit: options.limit,
          page: options.page,
          order_by: options.orderBy as 'created_at' | 'updated_at' | undefined,
        });

        printCollectionList(result.results, result.total, result.next_page, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
