import { test, describe } from 'node:test';
import assert from 'node:assert';
import { MemItTool } from '../../src/tools/mem-it.js';
import { MemAPIClient } from '../../src/client/mem-api-client.js';
import { ValidationError } from '../../src/utils/error-handler.js';

describe('MemItTool', () => {
  const mockClient = new MemAPIClient('test-api-key');

  test('should validate required input parameter', async () => {
    const tool = new MemItTool(mockClient);

    await assert.rejects(
      async () => await tool.handle({}),
      (error: Error) => {
        assert.strictEqual(error.name, 'ValidationError');
        return true;
      }
    );
  });

  test('should validate input max length', async () => {
    const tool = new MemItTool(mockClient);
    const tooLongInput = 'x'.repeat(1000001);

    await assert.rejects(
      async () => await tool.handle({ input: tooLongInput }),
      (error: Error) => {
        assert.strictEqual(error.name, 'ValidationError');
        return true;
      }
    );
  });

  test('should accept valid input', async () => {
    const tool = new MemItTool(mockClient);

    // This test will fail when actually calling the API without valid credentials
    // but it validates the schema accepts the input
    try {
      await tool.handle({ input: 'Test content' });
    } catch (error) {
      // Expected to fail at API call level, not validation
      assert.ok(error instanceof Error);
      assert.notStrictEqual(error.name, 'ValidationError');
    }
  });

  test('should generate correct tool definition', () => {
    const tool = new MemItTool(mockClient);
    const definition = tool.toDefinition();

    assert.strictEqual(definition.name, 'mem_it');
    assert.strictEqual(typeof definition.description, 'string');
    assert.strictEqual(definition.inputSchema.type, 'object');
    assert.ok('input' in definition.inputSchema.properties);
  });
});
