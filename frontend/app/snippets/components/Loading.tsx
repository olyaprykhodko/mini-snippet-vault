interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  text = 'Loading...',
  fullScreen = true,
}: LoadingProps) {
  const wrapperClassName = fullScreen
    ? 'flex min-h-screen items-center justify-center'
    : 'flex items-center justify-center py-16';

  return (
    <div className={wrapperClassName}>
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-emerald-200 bg-white text-emerald-700">
          <i className="ri-loader-4-line animate-spin text-3xl" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600">{text}</p>
      </div>
    </div>
  );
}
