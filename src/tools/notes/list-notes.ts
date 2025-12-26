import { z } from 'zod';
import { BaseTool } from '../base-tool.js';
import type { MemAPIClient } from '../../client/mem-api-client.js';

const listNotesSchema = z.object({});

/**
 * Tool for listing all notes
 */
export class ListNotesTool extends BaseTool {
  constructor(client: MemAPIClient) {
    super(
      'list_notes',
      'List all notes in mem.ai.',
      listNotesSchema,
      client
    );
  }

  protected async execute(_params: unknown) {
    return this.client.listNotes();
  }
}
