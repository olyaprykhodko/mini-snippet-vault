export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSnippets {
  items: Snippet[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FormData {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}

export interface FormErrors {
  title: string;
  content: string;
  tags: string;
  type: string;
}

export interface SearchData {
  query: string;
  tag: string;
}

export interface ApiErrorResponse {
  message?: string;
  statusCode?: number | string;
}

export type SnippetType = 'link' | 'note' | 'command';
export const SNIPPET_TYPES: SnippetType[] = ['note', 'link', 'command'];
