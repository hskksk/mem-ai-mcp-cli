import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ValidationError } from '../utils/error-handler.js';
import type { ToolResponse, ToolDefinition } from '../types/tools.js';
import type { MemAPIClient } from '../client/mem-api-client.js';

/**
 * Abstract base class for all MCP tools
 */
export abstract class BaseTool {
  protected client: MemAPIClient;

  constructor(
    public name: string,
    public description: string,
    public schema: z.ZodType<unknown>,
    client: MemAPIClient
  ) {
    this.client = client;
  }

  /**
   * Handle tool execution with parameter validation and error handling
   */
  async handle(params: unknown): Promise<ToolResponse> {
    try {
      // Validate parameters
      const validated = this.schema.parse(params);

      // Execute tool logic
      const result = await this.execute(validated);

      // Return successful response
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        throw new ValidationError('Invalid parameters', error.issues);
      }

      // Re-throw other errors to be handled by server
      throw error;
    }
  }

  /**
   * Convert tool to MCP tool definition
   */
  toDefinition(): ToolDefinition {
    const jsonSchema = zodToJsonSchema(this.schema, {
      $refStrategy: 'none',
    }) as { type: 'object'; properties: Record<string, unknown>; required?: string[] };

    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: jsonSchema.properties || {},
        required: jsonSchema.required,
      },
    };
  }

  /**
   * Execute the tool logic (to be implemented by subclasses)
   */
  protected abstract execute(params: unknown): Promise<unknown>;
}
