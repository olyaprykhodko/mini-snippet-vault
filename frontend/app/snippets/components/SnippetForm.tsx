import Error from './Error';
import { FormData, FormErrors } from '../types';
import Button from './Button';

interface SnippetFormProps {
  title: string;
  formData: FormData;
  onChange: (name: keyof FormData, value: string | string[]) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  loading: boolean;
  errors: FormErrors;
  selectOptions: string[];
  tagInputValue: string;
  onTagInputChange: (value: string) => void;
  submitLabel?: string;
  tagSuggestions?: string[];
  onTagPick?: (tag: string) => void;
}

export default function SnippetForm({
  title,
  formData,
  onChange,
  onSubmit,
  loading,
  errors,
  selectOptions,
  tagInputValue,
  onTagInputChange,
  submitLabel = 'Save snippet',
  tagSuggestions = [],
  onTagPick,
}: SnippetFormProps) {
  const handleTagRemove = (tagToRemove: string) => {
    const nextTags = formData.tags.filter((tag) => tag !== tagToRemove);
    onChange('tags', nextTags);
    onTagInputChange(nextTags.join(' '));
  };

  return (
    <div className="mb-6 border border-slate-200 bg-white p-6">
      <div className="mb-6 pb-4">
        <h2 className="text-lg font-semibold text-emerald-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the fields and save the snippet to your vault.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            maxLength={30}
            className="w-full border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            placeholder="Snippet title"
          />
          <div className="mt-1 min-h-5">
            {errors.title && <Error error={errors.title} />}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => onChange('content', e.target.value)}
            maxLength={300}
            rows={6}
            className="w-full border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            placeholder="Snippet content"
          />
          <div className="mt-1 min-h-5">
            {errors.content && <Error error={errors.content} />}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={tagInputValue}
              onChange={(e) => onTagInputChange(e.target.value)}
              list="snippet-tag-suggestions"
              className="w-full border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="frontend api personal"
            />
            <p className="mt-1 text-xs text-slate-500">
              Separate tags with spaces.
            </p>
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    {tag}
                    <i className="ri-close-line text-sm" />
                  </button>
                ))}
              </div>
            )}
            {tagSuggestions.length > 0 && (
              <>
                <datalist id="snippet-tag-suggestions">
                  {tagSuggestions.map((tag) => (
                    <option key={tag} value={tag} />
                  ))}
                </datalist>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tagSuggestions.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onTagPick?.(tag)}
                      className="border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-100"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => onChange('type', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            >
              {selectOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="mt-1 min-h-5">
              {errors.type && <Error error={errors.type} />}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="submit"
          disabled={loading}
          text={loading ? 'Saving...' : submitLabel}
        />
      </form>
    </div>
  );
}
