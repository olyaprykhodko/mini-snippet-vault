interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
  );
}
