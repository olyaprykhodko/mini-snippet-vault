export interface SnippetDocument {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
