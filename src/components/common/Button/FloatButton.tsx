import { isFulfilled } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
  const [isFlipped, setIsFlipped] = useState(false);

  const router = useRouter();

  if (type === 'add')
    return (
      <div>
        <button
          className={`${
            isFlipped && '-translate-y-[4rem]'
          } fixed right-5 bottom-10 text-center transition-all text-white text-11 web:right-[calc(50vw-175px)] w-14 aspect-square rounded-full bg-primary-green-1 ${className}`}
          onClick={onClick}
          {...rest}
        >
          일정 <br /> 등록
        </button>
        <button
          className={`${
            isFlipped && '-translate-y-[8rem]'
          } fixed right-5 bottom-10 transition-all text-center text-white text-11 web:right-[calc(50vw-175px)] w-14 aspect-square rounded-full bg-primary-green-1 ${className}`}
          onClick={() => router.push('/event/create/create01')}
          {...rest}
        >
          새로운 <br /> 모임
        </button>
        <button
          className={`${
            isFlipped && 'bg-red-400'
          } fixed transition-colors ease-linear right-5 bottom-10 web:right-[calc(50vw-175px)] w-14 aspect-square rounded-full bg-primary-green-1 ${className}`}
          onClick={() => setIsFlipped(!isFlipped)}
          {...rest}
        >
          {!isFlipped ? (
            <Image
              src="/svg/icons/plus.svg"
              width={28}
              height={28}
              alt="filter"
              className="m-auto"
            />
          ) : (
            <Image
              src="/svg/icons/cross.svg"
              width={28}
              height={28}
              alt="filter"
              className="m-auto"
            />
          )}
        </button>
      </div>
    );
  if (type === 'filter')
    return (
      <button
        className={`fixed right-5 bottom-24 w-16 aspect-square rounded-full bg-primary-green-1 ${className}`}
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
