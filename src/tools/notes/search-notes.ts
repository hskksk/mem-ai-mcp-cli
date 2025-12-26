import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const searchNotesSchema = z.object({
  query: z.string().describe('Search query'),
  limit: z.number().int().positive().max(100).optional().describe('Maximum number of results (max 100)'),
  offset: z.number().int().nonnegative().optional().describe('Number of results to skip'),
});

/**
 * Tool for searching notes
 */
export class SearchNotesTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'search_notes',
      'Search across all notes in mem.ai.',
      searchNotesSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof searchNotesSchema>;
    return this.client.searchNotes(validated);
  }
}
