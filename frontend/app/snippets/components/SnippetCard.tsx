import { Snippet, SnippetType } from '../types';
import Button from './Button';

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SnippetCard({
  snippet,
  onEdit,
  onDelete,
}: SnippetCardProps) {
  const TYPE_COLORS: Record<SnippetType, string> = {
    note: 'bg-emerald-100 text-emerald-800',
    link: 'bg-teal-100 text-teal-800',
    command: 'bg-lime-100 text-lime-800',
  };

  return (
    <div className="border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{snippet.title}</h1>
        <span
          className={`px-2.5 py-1 text-xs font-semibold ${TYPE_COLORS[snippet.type]}`}
        >
          {snippet.type}
        </span>
      </div>

      <p className="mb-6 whitespace-pre-wrap text-slate-700">
        {snippet.content}
      </p>

      {snippet.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-900"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mb-6 text-xs text-slate-400">
        Created: {new Date(snippet.createdAt).toLocaleString()} · Updated:{' '}
        {new Date(snippet.updatedAt).toLocaleString()}
      </div>

      <div className="flex gap-3 border-t border-slate-200 pt-4">
        <Button type="button" variant="button" onClick={onEdit} text="Edit" />
        <Button
          type="button"
          variant="delete"
          onClick={onDelete}
          text="Delete"
        />
      </div>
    </div>
  );
}
