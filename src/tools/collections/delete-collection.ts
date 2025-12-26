import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const deleteCollectionSchema = z.object({
  collection_id: z.string().uuid().describe('Collection ID to delete'),
});

/**
 * Tool for deleting a collection
 */
export class DeleteCollectionTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'delete_collection',
      'Delete a collection from mem.ai.',
      deleteCollectionSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof deleteCollectionSchema>;
    return this.client.deleteCollection(validated.collection_id);
  }
}
