import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const searchCollectionsSchema = z.object({
  query: z.string().optional()
    .describe('Search query (optional)'),
  config: z.object({
    include_description: z.boolean().optional(),
  }).optional().describe('Response configuration'),
});

/**
 * Tool for searching collections
 */
export class SearchCollectionsTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'search_collections',
      'Search across all collections in mem.ai with optional query and configuration.',
      searchCollectionsSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof searchCollectionsSchema>;
    return this.client.searchCollections(validated);
  }
}
