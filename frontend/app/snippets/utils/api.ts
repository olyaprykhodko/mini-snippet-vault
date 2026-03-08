import { ApiResponse, Snippet } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSnippets(params: {
  page?: string;
  limit?: string;
  q?: string;
  tag?: string;
}): Promise<ApiResponse<Snippet[]>> {
  const searchParams = new URLSearchParams();

  searchParams.set('page', params.page || '1');
  searchParams.set('limit', params.limit || '20');

  if (params.q) searchParams.set('q', params.q);
  if (params.tag) searchParams.set('tag', params.tag);

  try {
    const response = await fetch(`${BASE_URL}/snippets?${searchParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch snippets',
    );
  }
}
