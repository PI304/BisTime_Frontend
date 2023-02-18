import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

interface NavigateProps {
  back?: boolean;
  mode?: 'event' | 'team';
  className?: string;
}

export default function Navigate({
  back = false,
  mode = 'event',
  className,
}: NavigateProps) {
  const router = useRouter();
  return (
    <div
      className={`fixed top-0 max-w-[335px] w-full bg-white flex py-4 items-center ${className}`}
    >
      {back && (
        <div
          className="cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src="/svg/icons/caret_left.svg"
            width={24}
            height={24}
            alt="back"
          />
        </div>
      )}
      <div
        onClick={() => {
          router.push('/');
        }}
        className="text-18 font-bold cursor-pointer"
      >
        BISTIME<span className="text-12 ml-0.5 font-light">{mode}</span>
      </div>
    </div>
  );
}
