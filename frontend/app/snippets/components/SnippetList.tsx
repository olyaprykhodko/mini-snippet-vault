import { Snippet } from '../types';
import Link from 'next/link';
import SnippetContent from './SnippetContent';

interface SnippetListProps {
  snippets: Snippet[];
  onTagClick?: (tag: string) => void;
}

const TYPE_STYLES = {
  note: 'bg-emerald-100 text-emerald-800',
  link: 'bg-teal-100 text-teal-800',
  command: 'bg-lime-100 text-lime-800',
};

export default function SnippetList({
  snippets,
  onTagClick,
}: SnippetListProps) {
  return (
    <div className="grid min-w-0 max-w-full gap-4">
      {snippets.map((snippet) => (
        <div
          key={snippet._id}
          className="min-w-0 max-w-full overflow-hidden border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-300"
        >
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <Link
              href={`/snippets/${snippet._id}`}
              className="min-w-0 break-words text-lg font-semibold text-slate-900 hover:text-emerald-800"
            >
              {snippet.title}
            </Link>
            <span
              className={`w-fit shrink-0 px-2.5 py-1 text-xs font-semibold ${TYPE_STYLES[snippet.type]}`}
            >
              {snippet.type}
            </span>
          </div>
          <SnippetContent
            content={snippet.content}
            type={snippet.type}
            className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600"
          />
          {snippet.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagClick?.(tag)}
                  className="border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900 transition hover:border-emerald-400 hover:bg-emerald-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>{new Date(snippet.updatedAt).toLocaleDateString()}</span>
            <Link
              href={`/snippets/${snippet._id}`}
              className="font-medium text-emerald-700 hover:text-emerald-800"
            >
              Open details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
