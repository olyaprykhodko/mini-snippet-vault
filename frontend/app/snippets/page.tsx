'use client';

import { useMemo, useState } from 'react';
import SnippetForm from './components/SnippetForm';
import { FormData, FormErrors, SearchData, SNIPPET_TYPES } from './types';
import { validateForm } from './utils/formValidation';
import SearchForm from './components/SearchForm';
import SnippetList from './components/SnippetList';
import { useFetchSnippets } from './hooks/useFetchSnippets';
import { useCreateSnippet } from './hooks/useCreateSnippet';
import Loading from './components/Loading';
import Error from './components/Error';
import Header from './components/Header';
import Button from './components/Button';
import NotFound from './components/NotFound';

const PAGE_SIZE = 10;

export default function Snippets() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState<SearchData>({
    query: '',
    tag: '',
  });
  const [appliedSearch, setAppliedSearch] = useState<SearchData>({
    query: '',
    tag: '',
  });

  const {
    data: snippets,
    loading: snippetsLoading,
    error: fetchError,
    refetch,
  } = useFetchSnippets({
    page: currentPage,
    limit: PAGE_SIZE,
    query: appliedSearch.query.trim() || undefined,
    tag: appliedSearch.tag.trim() || undefined,
  });

  const { data: tagSource, refetch: refetchTags } = useFetchSnippets({
    page: 1,
    limit: 50,
  });

  const { create, loading: creating, error: createError } = useCreateSnippet();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    tags: [],
    type: 'note',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    content: '',
    tags: '',
    type: '',
  });
  const [tagInputValue, setTagInputValue] = useState('');
  const [showForm, setShowForm] = useState(false);

  const allTags = useMemo(
    () =>
      [
        ...new Set((tagSource.items ?? []).flatMap((snippet) => snippet.tags)),
      ].sort((left, right) => left.localeCompare(right)),
    [tagSource.items],
  );

  const handleFormDataChange = (
    name: keyof FormData,
    value: string | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
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
      if (prev.tags.includes(tag)) {
        return prev;
      }

      const nextTags = [...prev.tags, tag];
      setTagInputValue(nextTags.join(' '));
      return { ...prev, tags: nextTags };
    });
  };

  const handleSnippetCreate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.values(errors).some(Boolean)) {
      setFormErrors(errors);
      return;
    }

    const result = await create(formData);
    if (result) {
      setFormData({ title: '', content: '', tags: [], type: 'note' });
      setTagInputValue('');
      setFormErrors({ title: '', content: '', tags: '', type: '' });
      setShowForm(false);
      await Promise.all([
        refetch({
          page: 1,
          limit: PAGE_SIZE,
          query: appliedSearch.query.trim() || undefined,
          tag: appliedSearch.tag.trim() || undefined,
        }),
        refetchTags({ page: 1, limit: 50 }),
      ]);
      setCurrentPage(1);
    }
  };

  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    setAppliedSearch({
      query: searchData.query.trim(),
      tag: searchData.tag.trim(),
    });
  };

  const handleSearchFieldReset = () => {
    setSearchData({ query: '', tag: '' });
    setAppliedSearch({ query: '', tag: '' });
    setCurrentPage(1);
  };

  const handleTagFilter = (tag: string) => {
    setSearchData({ query: '', tag });
    setAppliedSearch({ query: '', tag });
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, snippets.totalPages));
  };

  const hasPreviousPage = snippets.page > 1;
  const hasNextPage = snippets.page < snippets.totalPages;
  const hasPagination = snippets.totalPages > 1;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl min-w-0 px-4 py-10 md:px-6">
        <div className="mb-8 flex min-w-0 flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between">
          <Header />

          <section className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <div className="border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700">
                <span className="font-semibold">{snippets.total}</span> snippets
              </div>

              <Button
                type="button"
                text={showForm ? 'Close form' : 'New snippet'}
                onClick={() => setShowForm((prev) => !prev)}
              />
            </div>
          </section>
        </div>

        {showForm && (
          <section>
            {createError && (
              <div className="mb-4">
                <Error error={createError} />
              </div>
            )}
            <SnippetForm
              title="Create new snippet"
              formData={formData}
              onChange={handleFormDataChange}
              onSubmit={handleSnippetCreate}
              selectOptions={SNIPPET_TYPES}
              errors={formErrors}
              loading={creating}
              tagInputValue={tagInputValue}
              onTagInputChange={handleTagInputChange}
              submitLabel="Create snippet"
              tagSuggestions={allTags}
              onTagPick={handleTagPick}
            />
          </section>
        )}

        <SearchForm
          onChange={handleSearchFieldChange}
          onSubmit={handleSearch}
          searchData={searchData}
          onReset={handleSearchFieldReset}
          tags={allTags}
          onTagSelect={handleTagFilter}
        />

        {snippetsLoading ? (
          <Loading fullScreen={false} text="Loading snippets..." />
        ) : fetchError ? (
          <Error error={fetchError} variant="page" onRetry={() => refetch()} />
        ) : snippets.items.length === 0 ? (
          <NotFound query={appliedSearch.query} tag={appliedSearch.tag} />
        ) : (
          <>
            <SnippetList
              snippets={snippets.items}
              onTagClick={handleTagFilter}
            />
            {hasPagination && (
              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
                <p>
                  Page {snippets.page} of {snippets.totalPages}
                </p>
                <div className="flex items-center gap-3">
                  {hasPreviousPage && (
                    <Button
                      type="button"
                      variant="button"
                      text="Previous"
                      onClick={handlePreviousPage}
                    />
                  )}
                  {hasNextPage && (
                    <Button
                      type="button"
                      text="Next"
                      onClick={handleNextPage}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
