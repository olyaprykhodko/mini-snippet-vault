import { SearchData } from '../types';
import Button from './Button';

interface SearchFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent) => void;
  searchData: SearchData;
  onReset: () => void;
}

export default function SearchForm({
  onChange,
  onSubmit,
  searchData,
  onReset,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 rounded-lg bg-white p-4 shadow">
      <div className="flex gap-3">
        <input
          type="text"
          name="query"
          value={searchData.query}
          onChange={(e) => onChange(e)}
          placeholder="Search snippets..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="tag"
          value={searchData.tag}
          onChange={(e) => onChange(e)}
          placeholder="Filter by tag"
          className="w-48 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
    </form>
  );
}
