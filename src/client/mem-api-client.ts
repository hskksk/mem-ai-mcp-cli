import {
  MemAPIError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from '../utils/error-handler.js';
import type {
  MemItRequest,
  MemItResponse,
  CreateNoteRequest,
  CreateNoteResponse,
  GetNoteResponse,
  DeleteNoteResponse,
  ListNotesRequest,
  ListNotesResponse,
  SearchNotesRequest,
  SearchNotesResponse,
  CreateCollectionRequest,
  CreateCollectionResponse,
  GetCollectionResponse,
  DeleteCollectionResponse,
  ListCollectionsRequest,
  ListCollectionsResponse,
  SearchCollectionsRequest,
  SearchCollectionsResponse,
} from '../types/api.js';

/**
 * HTTP client for mem.ai API
 */
export class MemAPIClient {
  private baseURL: string;
  private apiKey: string;
  private timeout: number;

  constructor(apiKey: string, baseURL: string = 'https://api.mem.ai', timeout: number = 30000) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Make HTTP request to mem.ai API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      if (error instanceof MemAPIError) {
        throw error;
      }
      if ((error as Error).name === 'AbortError') {
        throw new MemAPIError(408, 'Request timeout');
      }
      throw new MemAPIError(500, `Request failed: ${(error as Error).message}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Handle API error responses
   */
  private async handleError(response: Response): Promise<MemAPIError> {
    const errorData = await response.json().catch(() => ({})) as { message?: string; error?: string };
    const message = errorData.message || errorData.error || response.statusText;

    switch (response.status) {
      case 401:
        return new AuthenticationError(message);
      case 404:
        return new NotFoundError(message);
      case 429: {
        const retryAfter = response.headers.get('Retry-After');
        return new RateLimitError(
          message,
          retryAfter ? parseInt(retryAfter, 10) : undefined
        );
      }
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError(message);
      default:
        return new MemAPIError(response.status, message, errorData);
    }
  }

  // ========== Mem It ==========

  /**
   * Remember content intelligently using Mem It
   */
  async memIt(params: MemItRequest): Promise<MemItResponse> {
    return this.request<MemItResponse>('/v2/mem-it', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // ========== Notes ==========

  /**
   * Create a new note
   */
  async createNote(params: CreateNoteRequest): Promise<CreateNoteResponse> {
    return this.request<CreateNoteResponse>('/v2/notes', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Get a specific note by ID
   */
  async getNote(noteId: string): Promise<GetNoteResponse> {
    return this.request<GetNoteResponse>(`/v2/notes/${noteId}`, {
      method: 'GET',
    });
  }

  /**
   * Delete a note
   */
  async deleteNote(noteId: string): Promise<DeleteNoteResponse> {
    return this.request<DeleteNoteResponse>(`/v2/notes/${noteId}`, {
      method: 'DELETE',
    });
  }

  /**
   * List all notes with optional filtering and pagination
   */
  async listNotes(params?: ListNotesRequest): Promise<ListNotesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      queryParams.append('page', params.page);
    }
    if (params?.order_by) {
      queryParams.append('order_by', params.order_by);
    }
    if (params?.collection_id) {
      queryParams.append('collection_id', params.collection_id);
    }
    if (params?.contains_open_tasks) {
      queryParams.append('contains_open_tasks', 'true');
    }
    if (params?.contains_tasks) {
      queryParams.append('contains_tasks', 'true');
    }
    if (params?.contains_images) {
      queryParams.append('contains_images', 'true');
    }
    if (params?.contains_files) {
      queryParams.append('contains_files', 'true');
    }
    if (params?.include_note_content) {
      queryParams.append('include_note_content', 'true');
    }
    
    const query = queryParams.toString();
    const endpoint = `/v2/notes${query ? `?${query}` : ''}`;
    return this.request<ListNotesResponse>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Search notes
   */
  async searchNotes(params: SearchNotesRequest): Promise<SearchNotesResponse> {
    return this.request<SearchNotesResponse>('/v2/notes/search', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // ========== Collections ==========

  /**
   * Create a new collection
   */
  async createCollection(params: CreateCollectionRequest): Promise<CreateCollectionResponse> {
    return this.request<CreateCollectionResponse>('/v2/collections', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
   * Get a specific collection by ID
   */
  async getCollection(collectionId: string): Promise<GetCollectionResponse> {
    return this.request<GetCollectionResponse>(`/v2/collections/${collectionId}`, {
      method: 'GET',
    });
  }

  /**
   * Delete a collection
   */
  async deleteCollection(collectionId: string): Promise<DeleteCollectionResponse> {
    return this.request<DeleteCollectionResponse>(`/v2/collections/${collectionId}`, {
      method: 'DELETE',
    });
  }

  /**
   * List all collections with optional filtering and pagination
   */
  async listCollections(params?: ListCollectionsRequest): Promise<ListCollectionsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      queryParams.append('page', params.page);
    }
    if (params?.order_by) {
      queryParams.append('order_by', params.order_by);
    }
    
    const query = queryParams.toString();
    const endpoint = `/v2/collections${query ? `?${query}` : ''}`;
    return this.request<ListCollectionsResponse>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Search collections
   */
  async searchCollections(params: SearchCollectionsRequest): Promise<SearchCollectionsResponse> {
    return this.request<SearchCollectionsResponse>('/v2/collections/search', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}
