import { useRouter } from 'next/router';

export default function Navigate() {
  const router = useRouter();
  return (
    <div className="fixed top-0 w-full bg-white flex h-[60px] items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <div
        onClick={() => {
          router.push('/');
        }}
        className="text-[20px] ml-2 font-bold cursor-pointer"
      >
        BISTIMES
      </div>
    </div>
  );
}
