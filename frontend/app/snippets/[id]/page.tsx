'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SnippetForm from '../components/SnippetForm';
import { useFetchSnippets } from '../hooks/useFetchSnippets';
import { useFetchSnippet } from '../hooks/useFetchSnippet';
import { useUpdateSnippet } from '../hooks/useUpdateSnippet';
import { FormData, FormErrors, SNIPPET_TYPES } from '../types';
import { validateForm } from '../utils/formValidation';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import SnippetCard from '../components/SnippetCard';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { useDeleteSnippet } from '../hooks/useDeleteSnippet';

export default function SnippetDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    data: snippet,
    loading: fetchLoading,
    error: fetchError,
    refetch,
  } = useFetchSnippet(id);

  const { data: tagSource, refetch: refetchTags } = useFetchSnippets({
    page: 1,
    limit: 50,
  });

  const { update, loading: updating, error: updateError } = useUpdateSnippet();
  const {
    onDelete,
    loading: deleting,
    error: deleteError,
  } = useDeleteSnippet();

  const allTags = useMemo(
    () =>
      [...new Set(tagSource.items.flatMap((item) => item.tags))].sort(
        (left, right) => left.localeCompare(right),
      ),
    [tagSource.items],
  );

  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [tagInputValue, setTagInputValue] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    content: '',
    tags: '',
    type: '',
  });

  const currentFormData: FormData = formData ?? {
    title: snippet?.title ?? '',
    content: snippet?.content ?? '',
    tags: snippet?.tags ?? [],
    type: snippet?.type ?? 'note',
  };

  const handleFormDataChange = (
    name: keyof FormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({
      ...(prev ?? currentFormData),
      [name]: value,
    }));
  };

  const handleTagInputChange = (value: string) => {
    setTagInputValue(value);
    handleFormDataChange(
      'tags',
      value
        .split(/\s+/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    );
  };

  const handleTagPick = (tag: string) => {
    setFormData((prev) => {
      const nextData = prev ?? currentFormData;

      if (nextData.tags.includes(tag)) {
        return nextData;
      }

      const nextTags = [...nextData.tags, tag];
      setTagInputValue(nextTags.join(' '));
      return { ...nextData, tags: nextTags };
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(currentFormData);
    if (Object.values(errors).some(Boolean)) {
      setFormErrors(errors);
      return;
    }

    const result = await update(id, currentFormData);
    if (result) {
      setFormData(null);
      setTagInputValue('');
      setEditing(false);
      setFormErrors({ title: '', content: '', tags: '', type: '' });
      await Promise.all([refetch(), refetchTags({ page: 1, limit: 50 })]);
    }
  };

  const cancelEdit = () => {
    setFormData(null);
    setTagInputValue('');
    setEditing(false);
    setFormErrors({ title: '', content: '', tags: '', type: '' });
  };

  const handleDelete = async () => {
    const result = await onDelete(id);
    if (result) {
      setShowDeleteConfirm(false);
      router.push('/snippets');
    }
  };

  if (fetchLoading) {
    return <Loading text="Loading snippet..." />;
  }

  if (fetchError || !snippet) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg space-y-4">
          <Error
            variant="page"
            error={fetchError || 'Failed to load the snippet.'}
            onRetry={() => refetch()}
          />
          <div className="flex justify-center">
            <Button
              type="button"
              variant="button"
              text="Back to snippets"
              onClick={() => router.push('/snippets')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="button"
            text="Back to snippets"
            onClick={() => router.push('/snippets')}
          />
          {!editing && (
            <div className="border border-slate-300 bg-white px-4 py-2 text-sm text-slate-500">
              Last updated {new Date(snippet.updatedAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {editing ? (
          <div>
            {updateError && (
              <div className="mb-4">
                <Error error={updateError} />
              </div>
            )}
            <SnippetForm
              title="Edit snippet"
              formData={currentFormData}
              onChange={handleFormDataChange}
              onSubmit={handleUpdate}
              loading={updating}
              errors={formErrors}
              selectOptions={SNIPPET_TYPES}
              tagInputValue={tagInputValue || currentFormData.tags.join(' ')}
              onTagInputChange={handleTagInputChange}
              submitLabel="Save changes"
              tagSuggestions={allTags}
              onTagPick={handleTagPick}
            />
            <Button
              type="button"
              variant="cancel"
              text="Cancel"
              onClick={cancelEdit}
            />
          </div>
        ) : (
          <SnippetCard
            snippet={snippet}
            onEdit={() => setEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        )}

        {deleteError && (
          <div className="mt-4">
            <Error error={deleteError} />
          </div>
        )}

        {showDeleteConfirm && (
          <ConfirmDeleteModal
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirm(false)}
            loading={deleting}
          />
        )}
      </div>
    </div>
  );
}
