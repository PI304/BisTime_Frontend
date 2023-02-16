import { ErrorSVG } from '@public/svg';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="w-full mt-2 text-left flex text-system-error text-12 font-light">
      <span className="mr-0.5">{ErrorSVG}</span>
      {message}
    </p>
  );
}
