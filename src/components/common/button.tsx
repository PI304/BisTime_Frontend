interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary-green-1 text-b2 w-full h-11 flex items-center justify-center hover:opacity-90 text-white py-2 px-4 rounded-lg transition ${
        size === 'lg'
          ? 'h-11'
          : size === 'md'
          ? 'h-10'
          : size === 'sm'
          ? 'h-9'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
