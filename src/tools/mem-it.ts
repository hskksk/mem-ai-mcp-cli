import { z } from 'zod';
import { BaseTool } from './base-tool.js';
import type { MemAPIClient } from '../client/mem-api-client.js';

const memItSchema = z.object({
  input: z.string().max(1000000).describe('Content to remember (max ~1MB)'),
  instructions: z.string().max(10000).optional().describe('Processing instructions'),
  context: z.string().max(10000).optional().describe('Background context'),
  timestamp: z.string().datetime().optional().describe('ISO 8601 timestamp'),
});

/**
 * Tool for remembering content intelligently using Mem It
 */
export class MemItTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'mem_it',
      'Remember any content intelligently. This is the primary endpoint for saving information to mem.ai.',
      memItSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof memItSchema>;
    return this.client.memIt(validated);
  }
}
