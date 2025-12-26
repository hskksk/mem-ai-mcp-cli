import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const createNoteSchema = z.object({
  content: z.string().max(200000).describe('Markdown formatted note content'),
  id: z.string().uuid().optional().describe('Optional UUID for the note'),
  collection_ids: z.array(z.string().uuid()).optional().describe('Collection IDs to add the note to'),
  collection_titles: z.array(z.string()).optional().describe('Collection titles to add the note to'),
  created_at: z.string().datetime().optional().describe('ISO 8601 creation timestamp'),
  updated_at: z.string().datetime().optional().describe('ISO 8601 update timestamp'),
});

/**
 * Tool for creating a new note
 */
export class CreateNoteTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'create_note',
      'Create a new note in mem.ai with markdown content.',
      createNoteSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof createNoteSchema>;
    return this.client.createNote(validated);
  }
}
