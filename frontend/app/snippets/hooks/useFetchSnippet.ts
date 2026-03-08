import { useCallback, useEffect, useState } from 'react';
import { Snippet } from '../types';
import { fetchSnippets } from '../utils/api';

export function useFetchSnippet(id: string) {
  const [data, setData] = useState<Snippet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listResponse = await fetchSnippets({
        page: '1',
        limit: '50',
      });
      const snippet = listResponse.data.items.find((item) => item._id === id);

      if (!snippet) {
        throw new Error('Snippet not found');
      }

      setData(snippet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load snippet');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, error, loading, refetch: load };
}
