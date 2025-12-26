import { z } from 'zod';

/**
 * Type definitions for MCP tools
 */

/**
 * Base tool response content
 */
export interface ToolResponseContent {
  type: 'text';
  text: string;
}

/**
 * Base tool response
 */
export interface ToolResponse {
  content: ToolResponseContent[];
  isError?: boolean;
}

/**
 * Tool definition for MCP server
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

/**
 * Base tool interface
 */
export interface BaseTool {
  name: string;
  description: string;
  schema: z.ZodType<unknown>;
  handle(params: unknown): Promise<ToolResponse>;
  toDefinition(): ToolDefinition;
}
