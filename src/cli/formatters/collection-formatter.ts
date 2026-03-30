import type { Collection, CollectionListItem, CreateCollectionResponse } from '../../types/api.js';
import { formatDate } from '../utils.js';

export function printCollectionList(results: CollectionListItem[], total: number, nextPage: string | null, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ total, results, next_page: nextPage }) + '\n');
    return;
  }

  if (results.length === 0) {
    console.log('No collections found.');
    return;
  }

  console.log(`Found ${total} collection${total !== 1 ? 's' : ''}`);
  if (nextPage) {
    console.log(`(showing page, next: ${nextPage})`);
  }
  console.log();

  for (const col of results) {
    console.log(`${col.title} (${col.note_count} note${col.note_count !== 1 ? 's' : ''})`);
    console.log(`  ID:      ${col.id}`);
    console.log(`  Updated: ${formatDate(col.updated_at)}`);
    if (col.description) {
      console.log(`  ${col.description}`);
    }
    console.log();
  }
}

export function printCollection(collection: Collection, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify(collection) + '\n');
    return;
  }

  console.log(`Title:   ${collection.title}`);
  console.log(`ID:      ${collection.id}`);
  console.log(`Notes:   ${collection.note_count}`);
  if (collection.description) {
    console.log(`Description: ${collection.description}`);
  }
  console.log(`Created: ${formatDate(collection.created_at)}`);
  console.log(`Updated: ${formatDate(collection.updated_at)}`);
}

export function printCollectionCreated(collection: CreateCollectionResponse, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify(collection) + '\n');
    return;
  }

  console.log('Collection created successfully');
  console.log(`  ID:    ${collection.id}`);
  console.log(`  Title: ${collection.title}`);
}

export function printCollectionDeleted(id: string, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ success: true, id }) + '\n');
    return;
  }
  console.log('Collection deleted successfully');
  console.log(`  ID: ${id}`);
}

export function printCollectionSearchResults(results: Collection[], total: number, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ total, results }) + '\n');
    return;
  }

  if (results.length === 0) {
    console.log('No collections found.');
    return;
  }

  console.log(`Found ${total} collection${total !== 1 ? 's' : ''}`);
  console.log();

  for (const col of results) {
    console.log(`${col.title} (${col.note_count} note${col.note_count !== 1 ? 's' : ''})`);
    console.log(`  ID:      ${col.id}`);
    console.log(`  Updated: ${formatDate(col.updated_at)}`);
    if (col.description) {
      console.log(`  ${col.description}`);
    }
    console.log();
  }
}
