import { useCallback, useEffect, useState } from 'react';
import { fetchSnippets } from '../utils/api';
import { PaginatedSnippets } from '../types';

export function useFetchSnippets(params?: {
  page?: number;
  limit?: number;
  query?: string;
  tag?: string;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 6;
  const query = params?.query;
  const tag = params?.tag;

  const [data, setData] = useState<PaginatedSnippets>({
    items: [],
    total: 0,
    page,
    limit,
    totalPages: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (options?: {
      page?: number;
      limit?: number;
      query?: string;
      tag?: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSnippets({
          page: String(options?.page ?? page),
          limit: String(options?.limit ?? limit),
          q: options?.query ?? query ?? undefined,
          tag: options?.tag ?? tag ?? undefined,
        });
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load snippets',
        );
      } finally {
        setLoading(false);
      }
    },
    [limit, page, query, tag],
  );

  useEffect(() => {
    void load();
  }, [load]);

  return { data, error, loading, refetch: load };
}
