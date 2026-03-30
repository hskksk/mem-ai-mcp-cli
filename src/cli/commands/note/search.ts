import type { Command } from 'commander';
import type { MemAPIClient } from '../../../client/mem-api-client.js';
import { handleError } from '../../utils.js';
import { printNoteSearchResults } from '../../formatters/note-formatter.js';

export function registerNoteSearchCommand(noteCmd: Command, client: MemAPIClient): void {
  noteCmd
    .command('search [query]')
    .description('Search notes')
    .option('--collection-id <uuid>', 'Filter by collection ID (repeatable)', collect, [])
    .option('--open-tasks', 'Only notes with open tasks')
    .option('--tasks', 'Only notes with tasks')
    .option('--images', 'Only notes with images')
    .option('--files', 'Only notes with files')
    .option('--include-snippet', 'Include snippet in results')
    .option('--include-content', 'Include full content in results')
    .action(async (query: string | undefined, options, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const json = !!globalOpts.json;

      try {
        const result = await client.searchNotes({
          query,
          filter_by_collection_ids: options.collectionId.length > 0 ? options.collectionId : undefined,
          filter_by_contains_open_tasks: options.openTasks ? true : undefined,
          filter_by_contains_tasks: options.tasks ? true : undefined,
          filter_by_contains_images: options.images ? true : undefined,
          filter_by_contains_files: options.files ? true : undefined,
          config: (options.includeSnippet || options.includeContent) ? {
            include_snippet: options.includeSnippet ? true : undefined,
            include_content: options.includeContent ? true : undefined,
          } : undefined,
        });

        printNoteSearchResults(result.results, result.total, json);
      } catch (error) {
        handleError(error, json);
      }
    });
}

function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}
