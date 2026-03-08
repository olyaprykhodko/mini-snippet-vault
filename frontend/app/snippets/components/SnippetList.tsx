import { Snippet } from '../types';
import Link from 'next/link';
import Button from './Button';

interface SnippetListProps {
  snippets: Snippet[];
}

export default function SnippetList({ snippets }: SnippetListProps) {
  return (
    <div>
      {snippets.map((snippet) => (
        <div
          key={snippet._id}
          className="rounded-lg bg-white p-5 shadow transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <Link
              href={`/snippets/${snippet._id}`}
              className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
            >
              {snippet.title}
            </Link>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium">
              {snippet.type}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {snippet.content}
          </p>
          {snippet.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  onClick={() => {}}
                  variant="button"
                  text={`#${tag}`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
