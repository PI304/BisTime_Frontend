import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Toast from '../Toast';

interface NavigateProps {
  back?: boolean;
  link?: boolean;
  mode?: 'event' | 'team';
  className?: string;
}

export default function Navigate({
  back = false,
  link = false,
  mode = 'event',
  className,
}: NavigateProps) {
  const router = useRouter();
  const [toast, setToast] = useState(false);

  const handleShareLink = () => {
    setToast(true);
    const { uuid } = router.query;
    const uid = uuid as string;
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/event/update?uuid=${uid}`,
    );
  };

  return (
    <>
      <div
        className={`absolute top-0 max-w-[335px] w-full bg-white flex py-4 items-center ${className}`}
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
        {link && (
          <div className="ml-auto relative">
            <button
              onClick={handleShareLink}
              className="p-2.5 py-2 text-12 rounded bg-primary-green-1 text-white"
            >
              링크복사
            </button>
          </div>
        )}
      </div>
      {toast && <Toast setToast={setToast} text="링크가 복사되었습니다." />}
    </>
  );
}
