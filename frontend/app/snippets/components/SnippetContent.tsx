import { SnippetType } from '../types';

interface SnippetContentProps {
  content: string;
  type: SnippetType;
  className?: string;
}

const getLinkHref = (content: string) => {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return null;
  }

  try {
    return new URL(trimmedContent).toString();
  } catch {
    try {
      return new URL(`https://${trimmedContent}`).toString();
    } catch {
      return null;
    }
  }
};

export default function SnippetContent({
  content,
  type,
  className = '',
}: SnippetContentProps) {
  if (type === 'command') {
    return (
      <pre
        className={`${className} block w-full max-w-full overflow-x-auto whitespace-pre-wrap break-all rounded-md border border-slate-300 bg-slate-100 px-4 py-3 font-mono text-sm leading-6 text-slate-900 shadow-sm`}
      >
        <code className="block max-w-full">{content}</code>
      </pre>
    );
  }

  if (type !== 'link') {
    return <p className={`${className} max-w-full break-words`}>{content}</p>;
  }

  const href = getLinkHref(content);

  if (!href) {
    return <p className={className}>{content}</p>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${className} block max-w-full break-all text-teal-700 underline decoration-teal-300 underline-offset-4 transition hover:text-teal-900`}
    >
      {content}
    </a>
  );
}
