import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const listCollectionsSchema = z.object({});

/**
 * Tool for listing all collections
 */
export class ListCollectionsTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'list_collections',
      'List all collections in mem.ai.',
      listCollectionsSchema,
      client
    );
  }

  protected async execute(_params: unknown) {
    return this.client.listCollections();
  }
}
