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

export type SnippetType = 'link' | 'note' | 'command';
export const SNIPPET_TYPES: SnippetType[] = ['note', 'link', 'command'];
