import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { MemAPIClient } from './client/mem-api-client.js';
import { MemItTool } from './tools/mem-it.js';
import { CreateNoteTool } from './tools/notes/create-note.js';
import { GetNoteTool } from './tools/notes/get-note.js';
import { DeleteNoteTool } from './tools/notes/delete-note.js';
import { ListNotesTool } from './tools/notes/list-notes.js';
import { SearchNotesTool } from './tools/notes/search-notes.js';
import { CreateCollectionTool } from './tools/collections/create-collection.js';
import { GetCollectionTool } from './tools/collections/get-collection.js';
import { DeleteCollectionTool } from './tools/collections/delete-collection.js';
import { ListCollectionsTool } from './tools/collections/list-collections.js';
import { SearchCollectionsTool } from './tools/collections/search-collections.js';
import type { BaseTool } from './tools/base-tool.js';

/**
 * Create and configure the MCP server
 */
export async function createServer(apiKey: string, baseURL?: string) {
  // Initialize API client
  const client = new MemAPIClient(apiKey, baseURL);

  // Initialize all tools
  const tools: BaseTool[] = [
    new MemItTool(client),
    new CreateNoteTool(client),
    new GetNoteTool(client),
    new DeleteNoteTool(client),
    new ListNotesTool(client),
    new SearchNotesTool(client),
    new CreateCollectionTool(client),
    new GetCollectionTool(client),
    new DeleteCollectionTool(client),
    new ListCollectionsTool(client),
    new SearchCollectionsTool(client),
  ];

  // Create tools map for quick lookup
  const toolsMap = new Map(tools.map((tool) => [tool.name, tool]));

  // Create MCP server
  const server = new Server(
    {
      name: 'mem-ai-mcp-server',
      version: '0.1.1',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register ListTools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((tool) => tool.toDefinition()),
  }));

  // Register CallTool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = toolsMap.get(request.params.name);

    if (!tool) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    try {
      const result = await tool.handle(request.params.arguments);
      return result as { content: Array<{ type: 'text'; text: string }>; isError?: boolean };
    } catch (error) {
      // Return error response in MCP format
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorName = error instanceof Error ? error.name : 'Error';

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                error: errorName,
                message: errorMessage,
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

/**
 * Start the MCP server with stdio transport
 */
export async function startServer(apiKey: string, baseURL?: string) {
  const server = await createServer(apiKey, baseURL);
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Log to stderr (stdout is used for MCP communication)
  console.error('mem.ai MCP server started successfully');
}
