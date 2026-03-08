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

export type SnippetType = 'link' | 'note' | 'command';
export const SNIPPET_TYPES: SnippetType[] = ['note', 'link', 'command'];
