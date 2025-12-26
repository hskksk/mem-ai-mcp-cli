import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const getCollectionSchema = z.object({
  collection_id: z.string().uuid().describe('Collection ID to retrieve'),
});

/**
 * Tool for retrieving a specific collection by ID
 */
export class GetCollectionTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'get_collection',
      'Retrieve a specific collection by its ID.',
      getCollectionSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof getCollectionSchema>;
    return this.client.getCollection(validated.collection_id);
  }
}
