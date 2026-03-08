import { useCallback, useState } from 'react';
import { deleteSnippet } from '../utils/api';
import { Snippet } from '../types';

export function useDeleteSnippet() {
  const [data, setData] = useState<Snippet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDelete = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteSnippet(id);
      setData(response.data);
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete snippet';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, onDelete };
}
