/**
 * Type definitions for mem.ai API requests and responses
 */

// ========== Mem It ==========

export interface MemItRequest {
  input: string;
  instructions?: string;
  context?: string;
  timestamp?: string;
}

export interface MemItResponse {
  request_id: string;
}

// ========== Notes ==========

export interface Note {
  id: string;
  title: string;
  content: string;
  collection_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  content: string;
  id?: string;
  collection_ids?: string[];
  collection_titles?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateNoteResponse extends Note {
  request_id: string;
}

export interface GetNoteResponse extends Note {}

export interface DeleteNoteResponse {
  success: boolean;
}

export interface ListNotesResponse {
  notes: Note[];
}

export interface SearchNotesRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface SearchNotesResponse {
  notes: Note[];
  total: number;
}

// ========== Collections ==========

export interface Collection {
  id: string;
  title: string;
  description?: string;
  note_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCollectionRequest {
  title: string;
  description?: string;
}

export interface CreateCollectionResponse extends Collection {
  request_id: string;
}

export interface GetCollectionResponse extends Collection {}

export interface DeleteCollectionResponse {
  success: boolean;
}

export interface ListCollectionsResponse {
  collections: Collection[];
}

export interface SearchCollectionsRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface SearchCollectionsResponse {
  collections: Collection[];
  total: number;
}
