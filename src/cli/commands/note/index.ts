import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { registerNoteListCommand } from './list.js';
import { registerNoteGetCommand } from './get.js';
import { registerNoteCreateCommand } from './create.js';
import { registerNoteDeleteCommand } from './delete.js';
import { registerNoteSearchCommand } from './search.js';

export function registerNoteCommands(program: Command, client: MemAPIClient): void {
  const noteCmd = program.command('note').description('Manage notes');

  registerNoteListCommand(noteCmd, client);
  registerNoteGetCommand(noteCmd, client);
  registerNoteCreateCommand(noteCmd, client);
  registerNoteDeleteCommand(noteCmd, client);
  registerNoteSearchCommand(noteCmd, client);
}
