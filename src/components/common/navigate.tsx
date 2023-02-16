import { useRouter } from 'next/router';
import { ArrowLeftSVG } from 'styles/svgs';

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
      className={`fixed top-0 max-w-[335px] w-full bg-white flex h-15 items-center ${className}`}
    >
      {back && ArrowLeftSVG}
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
