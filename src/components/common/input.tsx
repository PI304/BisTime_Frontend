interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  islabel?: boolean;
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  height?: 'lg' | 'md' | 'sm';
  className?: string;
  [key: string]: any;
}

function Input({
  islabel = false,
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  height = 'md',
  className,
  ...rest
}: InputProps) {
  return (
    <div className="space-y-[6px] flex flex-col">
      {islabel && (
        <label className="text-p3 text-primary-green-3" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`bg-secondary-orange-3 text-p2 placeholder:text-primary-green-3 text-primary-green-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-primary-green-3 focus:border-transparent ${
          height === 'lg'
            ? 'h-11'
            : height === 'md'
            ? 'h-10'
            : height === 'sm'
            ? 'h-9'
            : ''
        } ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <div className="text-system-error text-p3">{error}</div>}
    </div>
  );
}

export default Input;
