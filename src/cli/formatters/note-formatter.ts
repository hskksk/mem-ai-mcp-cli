import type { Note, NoteListItem, CreateNoteResponse } from '../../types/api.js';
import { formatDate } from '../utils.js';

export function printNoteList(results: NoteListItem[], total: number, nextPage: string | null, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ total, results, next_page: nextPage }) + '\n');
    return;
  }

  if (results.length === 0) {
    console.log('No notes found.');
    return;
  }

  console.log(`Found ${total} note${total !== 1 ? 's' : ''}`);
  if (nextPage) {
    console.log(`(showing page, next: ${nextPage})`);
  }
  console.log();

  for (const note of results) {
    const title = note.title || '(untitled)';
    console.log(`${title}`);
    console.log(`  ID:      ${note.id}`);
    console.log(`  Updated: ${formatDate(note.updated_at)}`);
    if (note.collection_ids.length > 0) {
      console.log(`  Collections: ${note.collection_ids.join(', ')}`);
    }
    console.log();
  }
}

export function printNote(note: Note, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify(note) + '\n');
    return;
  }

  console.log(`Title:   ${note.title || '(untitled)'}`);
  console.log(`ID:      ${note.id}`);
  if (note.collection_ids.length > 0) {
    console.log(`Collections: ${note.collection_ids.join(', ')}`);
  }
  console.log(`Created: ${formatDate(note.created_at)}`);
  console.log(`Updated: ${formatDate(note.updated_at)}`);
  console.log();
  console.log('---');
  console.log(note.content);
  console.log('---');
}

export function printNoteCreated(note: CreateNoteResponse, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify(note) + '\n');
    return;
  }

  console.log('Note created successfully');
  console.log(`  ID:    ${note.id}`);
  console.log(`  Title: ${note.title || '(untitled)'}`);
}

export function printNoteDeleted(id: string, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ success: true, id }) + '\n');
    return;
  }
  console.log(`Note deleted successfully`);
  console.log(`  ID: ${id}`);
}

export function printNoteSearchResults(results: Note[], total: number, json: boolean): void {
  if (json) {
    process.stdout.write(JSON.stringify({ total, results }) + '\n');
    return;
  }

  if (results.length === 0) {
    console.log('No notes found.');
    return;
  }

  console.log(`Found ${total} note${total !== 1 ? 's' : ''}`);
  console.log();

  for (const note of results) {
    const title = note.title || '(untitled)';
    console.log(`${title}`);
    console.log(`  ID:      ${note.id}`);
    console.log(`  Updated: ${formatDate(note.updated_at)}`);
    if (note.collection_ids.length > 0) {
      console.log(`  Collections: ${note.collection_ids.join(', ')}`);
    }
    console.log();
  }
}
