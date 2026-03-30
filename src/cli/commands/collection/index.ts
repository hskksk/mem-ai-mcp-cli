import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { registerCollectionListCommand } from './list.js';
import { registerCollectionGetCommand } from './get.js';
import { registerCollectionCreateCommand } from './create.js';
import { registerCollectionDeleteCommand } from './delete.js';
import { registerCollectionSearchCommand } from './search.js';

export function registerCollectionCommands(program: Command, client: MemAPIClient): void {
  const collectionCmd = program.command('collection').description('Manage collections');

  registerCollectionListCommand(collectionCmd, client);
  registerCollectionGetCommand(collectionCmd, client);
  registerCollectionCreateCommand(collectionCmd, client);
  registerCollectionDeleteCommand(collectionCmd, client);
  registerCollectionSearchCommand(collectionCmd, client);
}
