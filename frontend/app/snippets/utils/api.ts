import { ApiErrorResponse, ApiResponse, Snippet, FormData } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (response.status === 204) {
    return {
      statusCode: 204,
      message: 'Snippet deleted successfully',
      data: null as T,
    };
  }

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : 'Request failed';
    throw new Error(message);
  }

  if (!payload || !('data' in payload)) {
    throw new Error('Invalid server response');
  }

  return payload;
}

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
    return parseResponse<Snippet[]>(response);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch snippets',
    );
  }
}

export async function createSnippet(
  formData: FormData,
): Promise<ApiResponse<Snippet>> {
  try {
    const response = await fetch(`${BASE_URL}/snippets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return parseResponse<Snippet>(response);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create a snippet',
    );
  }
}

export async function updateSnippet(
  id: string,
  formData: FormData,
): Promise<ApiResponse<Snippet>> {
  try {
    const response = await fetch(
      `${BASE_URL}/snippets/${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      },
    );
    return parseResponse<Snippet>(response);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update a snippet',
    );
  }
}

export async function deleteSnippet(
  id: string,
): Promise<ApiResponse<Snippet | null>> {
  try {
    const response = await fetch(
      `${BASE_URL}/snippets/${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
      },
    );
    return parseResponse<Snippet | null>(response);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to delete a snippet',
    );
  }
}
