import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const getNoteSchema = z.object({
  note_id: z.string().uuid().describe('Note ID to retrieve'),
});

/**
 * Tool for retrieving a specific note by ID
 */
export class GetNoteTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'get_note',
      'Retrieve a specific note by its ID.',
      getNoteSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof getNoteSchema>;
    return this.client.getNote(validated.note_id);
  }
}
