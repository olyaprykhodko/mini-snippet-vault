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
    'font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 inline-flex items-center justify-center';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
  };

  const colorStyles = {
    button:
      'rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200',
    submit:
      'rounded-lg bg-indigo-600 px-6 py-2 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50',
    delete:
      'hover:bg-background-300 disabled:bg-background-300 text-primary-800 focus:ring-background-300', // fix
    cancel:
      'px-4 py-2 border border-background-200 dark:border-background-400 rounded-md text-background-900 hover:bg-background-100 dark:hover:bg-background-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
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
      {disabled ? <>Please wait...</> : <>{text}</>}
    </button>
  );
}
