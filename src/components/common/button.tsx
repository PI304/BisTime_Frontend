interface ButtonProps {
  size?: 'lg' | 'md' | 'sm';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export default function Button({
  size = 'md',
  className,
  disabled,
  onClick,
  children,
  ...rest
}: ButtonProps) {
  if (size === 'lg') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-primary-green-1 text-b2 w-full h-11 flex items-center justify-center hover:opacity-90 text-white py-2 px-4 rounded-lg transition ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (size === 'md') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-primary-green-1 text-b2 w-full h-10 flex items-center justify-center hover:opacity-90 text-white py-2 px-4 rounded-lg transition ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (size == 'sm') {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`bg-primary-green-1 text-b2 w-full h-9 flex items-center justify-center hover:opacity-90 text-white py-2 px-4 rounded-lg transition ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
