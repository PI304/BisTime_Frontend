import { useRouter } from 'next/router';

interface NavigateProps {
  left?: 'menu' | 'back' | 'none';
  center?: 'logo' | 'title' | 'none';
  right?: 'user' | 'none';
  title?: string;
  user?: string;
  className?: string;
}

export default function Navigate({
  left = 'menu',
  center = 'logo',
  right = 'none',
  title,
  user,
  className,
}: NavigateProps) {
  const router = useRouter();
  return (
    <div
      className={`fixed top-0 max-w-[335px] w-full bg-white flex h-[60px] items-center ${
        center === 'title' ? 'justify-between' : ''
      } ${className}`}
    >
      {left === 'menu' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
      {left === 'back' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      )}
      {left === 'none' && <div className="w-6 h-6" />}
      {center === 'logo' && (
        <div
          onClick={() => {
            router.push('/');
          }}
          className="text-[20px] ml-2 font-bold cursor-pointer"
        >
          BISTIME
        </div>
      )}
      {center === 'title' && (
        <div className="text-[20px] font-medium">{title}</div>
      )}
      {center === 'none' && <div className="w-6 h-6" />}
      {right === 'user' && (
        <div className="text-[16px] font-medium">{user}</div>
      )}
      {right === 'none' && <div className="w-6 h-6" />}
    </div>
  );
}
