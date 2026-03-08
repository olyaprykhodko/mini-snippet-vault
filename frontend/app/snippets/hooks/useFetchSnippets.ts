import { useCallback, useEffect, useState } from 'react';
import { fetchSnippets } from '../utils/api';
import { Snippet } from '../types';

export function useFetchSnippets(query?: string, tag?: string) {
  const [data, setData] = useState<Snippet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (q?: string, t?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSnippets({
        page: '1',
        limit: '50',
        q: q || undefined,
        tag: t || undefined,
      });
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load snippets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(query, tag);
  }, [query, tag, load]);

  return { data, error, loading, refetch: load };
}
