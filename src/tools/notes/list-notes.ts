import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const listNotesSchema = z.object({
  limit: z.number().int().positive().max(100).optional()
    .describe('Maximum number of results (default: 50)'),
  page: z.string().optional()
    .describe('Cursor for pagination (from previous next_page)'),
  order_by: z.enum(['created_at', 'updated_at']).optional()
    .describe('Sort order (default: updated_at)'),
  collection_id: z.string().uuid().optional()
    .describe('Filter by collection ID'),
  contains_open_tasks: z.boolean().optional()
    .describe('Filter notes containing open tasks'),
  contains_tasks: z.boolean().optional()
    .describe('Filter notes containing any tasks'),
  contains_images: z.boolean().optional()
    .describe('Filter notes containing images'),
  contains_files: z.boolean().optional()
    .describe('Filter notes containing files'),
  include_note_content: z.boolean().optional()
    .describe('Include full markdown content in response'),
});

/**
 * Tool for listing all notes with optional filtering and pagination
 */
export class ListNotesTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'list_notes',
      'List all notes in mem.ai with optional filtering, sorting, and cursor-based pagination.',
      listNotesSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof listNotesSchema>;
    return this.client.listNotes(validated);
  }
}
