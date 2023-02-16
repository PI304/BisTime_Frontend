import type { UseFormRegisterReturn } from 'react-hook-form';

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
  register: UseFormRegisterReturn;
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
  register,
  className,
  ...rest
}: InputProps) {
  return (
    <div className="w-full space-y-[6px] flex flex-col">
      {islabel && (
        <label className="text-p3 text-primary-green-3" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`bg-secondary-orange-3 text-12 font-medium  placeholder:text-primary-green-3 text-primary-green-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-primary-green-3 focus:border-transparent ${
          height === 'lg'
            ? 'h-9'
            : height === 'md'
            ? 'h-8'
            : height === 'sm'
            ? 'h-7'
            : ''
        } ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
      {error && <div className="text-system-error text-p3">{error}</div>}
    </div>
  );
}

export default Input;
