import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const searchCollectionsSchema = z.object({
  query: z.string().describe('Search query'),
  limit: z.number().int().positive().max(100).optional().describe('Maximum number of results (max 100)'),
  offset: z.number().int().nonnegative().optional().describe('Number of results to skip'),
});

/**
 * Tool for searching collections
 */
export class SearchCollectionsTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'search_collections',
      'Search across all collections in mem.ai.',
      searchCollectionsSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof searchCollectionsSchema>;
    return this.client.searchCollections(validated);
  }
}
