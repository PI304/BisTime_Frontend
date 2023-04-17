import Image from 'next/image';

interface FloatButtonProps {
  type?: 'add' | 'filter';
  onClick?: () => void;
  className?: string;
}

export default function FloatButton({
  type = 'add',
  onClick,
  className,
  ...rest
}: FloatButtonProps) {
  if (type === 'add')
    return (
      <button
        className={`fixed right-5 bottom-15 mobile:right-[calc(50vw-175px)] w-12 aspect-square rounded-full bg-primary-green-1 ${className}`}
        onClick={onClick}
        {...rest}
      >
        <Image
          src="/svg/icons/plus.svg"
          width={28}
          height={28}
          alt="filter"
          className="m-auto"
        />
      </button>
    );
  if (type === 'filter')
    return (
      <button
        className={`fixed right-5 bottom-24 w-12 aspect-square rounded-full bg-primary-green-1 ${className}`}
        onClick={onClick}
        {...rest}
      >
        <Image
          src="/svg/icons/filter.svg"
          width={24}
          height={24}
          alt="filter"
          className="m-auto"
        />
      </button>
    );
}
