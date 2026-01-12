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

export interface ListNotesRequest {
  limit?: number;
  page?: string;
  order_by?: 'created_at' | 'updated_at';
  collection_id?: string;
  contains_open_tasks?: boolean;
  contains_tasks?: boolean;
  contains_images?: boolean;
  contains_files?: boolean;
  include_note_content?: boolean;
}

export interface NoteListItem {
  id: string;
  title: string;
  snippet?: string;
  content: string;
  collection_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface ListNotesResponse {
  request_id: string;
  results: NoteListItem[];
  total: number;
  next_page: string | null;
}

export interface NoteResultsConfig {
  include_snippet?: boolean;
  include_content?: boolean;
}

export interface SearchNotesRequest {
  query?: string;
  filter_by_collection_ids?: string[];
  filter_by_contains_open_tasks?: boolean;
  filter_by_contains_tasks?: boolean;
  filter_by_contains_images?: boolean;
  filter_by_contains_files?: boolean;
  config?: NoteResultsConfig;
}

export interface SearchNotesResponse {
  request_id: string;
  results: Note[];
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

export interface ListCollectionsRequest {
  limit?: number;
  page?: string;
  order_by?: 'created_at' | 'updated_at';
}

export interface CollectionListItem {
  id: string;
  title: string;
  description?: string;
  note_count: number;
  created_at: string;
  updated_at: string;
}

export interface ListCollectionsResponse {
  request_id: string;
  results: CollectionListItem[];
  total: number;
  next_page: string | null;
}

export interface SearchCollectionsRequest {
  query?: string;
  config?: {
    include_description?: boolean;
  };
}

export interface SearchCollectionsResponse {
  request_id: string;
  results: Collection[];
  total: number;
}
