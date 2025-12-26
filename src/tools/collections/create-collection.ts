import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const createCollectionSchema = z.object({
  title: z.string().describe('Collection title'),
  description: z.string().optional().describe('Collection description'),
});

/**
 * Tool for creating a new collection
 */
export class CreateCollectionTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'create_collection',
      'Create a new collection in mem.ai.',
      createCollectionSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof createCollectionSchema>;
    return this.client.createCollection(validated);
  }
}
