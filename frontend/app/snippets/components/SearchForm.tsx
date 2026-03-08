import { SearchData } from '../types';
import Button from './Button';

interface SearchFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchData: SearchData;
  onReset: () => void;
  tags?: string[];
  onTagSelect?: (tag: string) => void;
}

export default function SearchForm({
  onChange,
  onSubmit,
  searchData,
  onReset,
  tags = [],
  onTagSelect,
}: SearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 max-w-full overflow-hidden border border-slate-200 bg-white p-4"
    >
      <div className="flex min-w-0 flex-col gap-3 md:flex-row">
        <input
          type="text"
          name="query"
          value={searchData.query}
          onChange={(e) => onChange(e)}
          placeholder="Search snippets..."
          className="min-w-0 flex-1 border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        />
        <input
          type="text"
          name="tag"
          value={searchData.tag}
          onChange={(e) => onChange(e)}
          placeholder="Filter by tag"
          className="min-w-0 w-full border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 md:w-56"
        />

        <Button type="submit" variant="submit" text="Search" />

        {(searchData.query || searchData.tag) && (
          <Button
            type="reset"
            variant="cancel"
            onClick={() => onReset()}
            text="Clear"
          />
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagSelect?.(tag)}
              className="border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-100"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
