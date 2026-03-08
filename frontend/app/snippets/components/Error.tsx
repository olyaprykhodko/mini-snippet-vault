import Button from './Button';

interface ErrorProps {
  error: string;
  variant?: 'field' | 'page';
  onRetry?: () => void;
}

export default function Error({
  error,
  variant = 'field',
  onRetry,
}: ErrorProps) {
  if (variant === 'field') {
    return <span className="text-sm text-red-600">{error}</span>;
  }

  return (
    <div className="border border-red-200 bg-white p-6 text-center text-red-700">
      <i className="ri-error-warning-line text-3xl" />
      <p className="mt-2 font-medium">{error}</p>
      <p className="mt-1 text-sm text-red-600/80">
        Check the connection or try the request again.
      </p>
      {onRetry && (
        <div className="mt-4 flex justify-center">
          <Button
            type="button"
            variant="delete"
            onClick={onRetry}
            text="Retry"
          />
        </div>
      )}
    </div>
  );
}
