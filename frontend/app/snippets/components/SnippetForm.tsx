import Error from './Error';
import { FormData, FormErrors } from '../types';
import Button from './Button';

interface SnippetFormProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSubmit: (e: React.SubmitEvent) => void;
  loading: boolean;
  errors: FormErrors;
  selectOptions: string[];
}

export default function SnippetForm({
  formData,
  onChange,
  onSubmit,
  loading,
  errors,
  selectOptions,
}: SnippetFormProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">Create New Snippet</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {errors && <Error error="Fill all required fields" />}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => onChange(e)}
            maxLength={30}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Snippet title"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e) => onChange(e)}
            maxLength={300}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Snippet content"
          />
          {errors?.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={(e) => onChange(e)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="tag1, tag2, tag3"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => onChange(e)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {selectOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors?.type && (
              <span className="text-red-500 text-sm">{errors.type}</span>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="submit"
          disabled={loading}
          text={loading ? 'Creating...' : 'Create Snippet'}
        />
      </form>
    </div>
  );
}
