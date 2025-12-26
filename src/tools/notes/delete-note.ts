import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const deleteNoteSchema = z.object({
  note_id: z.string().uuid().describe('Note ID to delete'),
});

/**
 * Tool for deleting a note
 */
export class DeleteNoteTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'delete_note',
      'Delete a note from mem.ai.',
      deleteNoteSchema,
      client
    );
  }

  protected async execute(params: unknown) {
    const validated = params as z.infer<typeof deleteNoteSchema>;
    return this.client.deleteNote(validated.note_id);
  }
}
