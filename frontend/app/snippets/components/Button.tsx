interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type: 'button' | 'submit' | 'reset';
  variant?: 'button' | 'submit' | 'delete' | 'cancel';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  text,
  onClick,
  disabled,
  type,
  variant = 'submit',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus:outline-none focus:ring focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50';

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const colorStyles = {
    button:
      'border border-slate-300 bg-white text-slate-700 hover:border-emerald-700 hover:text-emerald-800',
    submit:
      'border border-emerald-800 bg-emerald-800 text-white hover:bg-emerald-900',
    delete: 'border border-red-700 bg-red-700 text-white hover:bg-red-800',
    cancel: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${colorStyles[variant]} ${widthStyle} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClassName}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
