import { useCallback, useState } from 'react';
import { createSnippet } from '../utils/api';
import { Snippet, FormData } from '../types';

export function useCreateSnippet() {
  const [data, setData] = useState<Snippet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const create = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createSnippet(formData);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create snippet';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, create };
}
