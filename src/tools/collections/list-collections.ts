import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const listCollectionsSchema = z.object({
  limit: z.number().int().positive().max(100).optional()
    .describe('Maximum number of results (default: 50)'),
  page: z.string().optional()
    .describe('Cursor for pagination (from previous next_page)'),
  order_by: z.enum(['created_at', 'updated_at']).optional()
    .describe('Sort order (default: updated_at)'),
});

/**
 * Tool for listing all collections with optional filtering and pagination
 */
export class ListCollectionsTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'list_collections',
      'List all collections in mem.ai with optional sorting and cursor-based pagination.',
      listCollectionsSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof listCollectionsSchema>;
    return this.client.listCollections(validated);
  }
}
