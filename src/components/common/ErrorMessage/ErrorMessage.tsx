import Image from 'next/image';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="w-full mt-2 text-left flex text-system-error text-12 font-light">
      <span className="mr-0.5">
        <Image
          src="/svg/icons/Info_circle.svg"
          width={14}
          height={14}
          alt="info"
        />
      </span>
      {message}
    </p>
  );
}
