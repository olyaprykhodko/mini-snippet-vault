import Button from './Button';

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDeleteModal({
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
      <div className="w-full max-w-sm border border-slate-300 bg-white p-6 shadow-lg">
        <div className="mb-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-red-200 bg-white text-red-600">
            <i className="ri-delete-bin-line text-3xl" />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            Delete snippet?
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="cancel"
            text="Cancel"
            onClick={onCancel}
            fullWidth
            disabled={loading}
          />
          <Button
            type="button"
            variant="delete"
            text={loading ? 'Deleting...' : 'Delete'}
            onClick={onConfirm}
            fullWidth
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
