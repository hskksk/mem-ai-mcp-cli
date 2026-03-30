import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printNoteList } from '../../formatters/note-formatter.js';

export function registerNoteListCommand(noteCmd: Command, client: MemAPIClient): void {
  noteCmd
    .command('list')
    .description('List all notes')
    .option('--limit <n>', 'Number of notes to return (1-100)', parseInt)
    .option('--page <cursor>', 'Pagination cursor')
    .option('--order-by <field>', 'Sort order: created_at | updated_at')
    .option('--collection-id <uuid>', 'Filter by collection ID')
    .option('--open-tasks', 'Only notes with open tasks')
    .option('--tasks', 'Only notes with tasks')
    .option('--images', 'Only notes with images')
    .option('--files', 'Only notes with files')
    .option('--with-content', 'Include note content in response')
    .action(async (options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.listNotes({
          limit: options.limit,
          page: options.page,
          order_by: options.orderBy as 'created_at' | 'updated_at' | undefined,
          collection_id: options.collectionId,
          contains_open_tasks: options.openTasks ? true : undefined,
          contains_tasks: options.tasks ? true : undefined,
          contains_images: options.images ? true : undefined,
          contains_files: options.files ? true : undefined,
          include_note_content: options.withContent ? true : undefined,
        });

        printNoteList(result.results, result.total, result.next_page, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}
