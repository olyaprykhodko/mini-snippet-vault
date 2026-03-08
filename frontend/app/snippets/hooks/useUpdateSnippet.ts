import { useCallback, useState } from 'react';
import { updateSnippet } from '../utils/api';
import { Snippet, FormData } from '../types';

export function useUpdateSnippet() {
  const [data, setData] = useState<Snippet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = useCallback(async (id: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateSnippet(id, formData);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update snippet';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, update };
}
