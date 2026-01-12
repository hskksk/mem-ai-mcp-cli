import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const searchNotesSchema = z.object({
  query: z.string().optional()
    .describe('Search query (optional)'),
  filter_by_collection_ids: z.array(z.string().uuid()).optional()
    .describe('Filter by collection IDs'),
  filter_by_contains_open_tasks: z.boolean().optional()
    .describe('Filter notes with open tasks'),
  filter_by_contains_tasks: z.boolean().optional()
    .describe('Filter notes with any tasks'),
  filter_by_contains_images: z.boolean().optional()
    .describe('Filter notes with images'),
  filter_by_contains_files: z.boolean().optional()
    .describe('Filter notes with files'),
  config: z.object({
    include_snippet: z.boolean().optional(),
    include_content: z.boolean().optional(),
  }).optional().describe('Response configuration'),
});

/**
 * Tool for searching notes with advanced filtering
 */
export class SearchNotesTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'search_notes',
      'Search across all notes in mem.ai with optional query and advanced filtering options.',
      searchNotesSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof searchNotesSchema>;
    return this.client.searchNotes(validated);
  }
}
