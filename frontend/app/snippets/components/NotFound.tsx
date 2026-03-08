import { SearchData } from '../types';

export default function NotFound({ query, tag }: SearchData) {
  return (
    <div className="border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center border border-emerald-200 bg-emerald-50 text-emerald-700">
        <i className="ri-inbox-archive-line text-2xl" />
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">
        No snippets found
      </p>
      <p className="mt-2 text-sm text-slate-500">
        {query || tag
          ? 'Try changing your search query or tag filter.'
          : 'Create your first snippet to start building the vault.'}
      </p>
    </div>
  );
}
