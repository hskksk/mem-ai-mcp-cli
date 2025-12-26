import { test, describe } from 'node:test';
import assert from 'node:assert';
import { MemAPIClient } from '../../src/client/mem-api-client.js';

describe('MemAPIClient', () => {
  test('should initialize with API key', () => {
    const client = new MemAPIClient('test-api-key');
    assert.ok(client);
  });

  test('should initialize with custom base URL', () => {
    const client = new MemAPIClient('test-api-key', 'https://custom.api.com');
    assert.ok(client);
  });

  test('should initialize with custom timeout', () => {
    const client = new MemAPIClient('test-api-key', 'https://api.mem.ai', 60000);
    assert.ok(client);
  });

  test('should have all endpoint methods', () => {
    const client = new MemAPIClient('test-api-key');

    // Check all methods exist
    assert.strictEqual(typeof client.memIt, 'function');
    assert.strictEqual(typeof client.createNote, 'function');
    assert.strictEqual(typeof client.getNote, 'function');
    assert.strictEqual(typeof client.deleteNote, 'function');
    assert.strictEqual(typeof client.listNotes, 'function');
    assert.strictEqual(typeof client.searchNotes, 'function');
    assert.strictEqual(typeof client.createCollection, 'function');
    assert.strictEqual(typeof client.getCollection, 'function');
    assert.strictEqual(typeof client.deleteCollection, 'function');
    assert.strictEqual(typeof client.listCollections, 'function');
    assert.strictEqual(typeof client.searchCollections, 'function');
  });
});
