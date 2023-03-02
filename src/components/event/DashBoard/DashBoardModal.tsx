import Layout from '@components/common/Layout';
import Image from 'next/image';
interface DashBoardModalProps {
  onClose: () => void;
}

export default function DashBoardModal({ onClose }: DashBoardModalProps) {
  return (
    <Layout className="h-screen bg-white absolute mx-auto max-w-[375px] inset-0 z-10">
      <div className="absolute top-0 max-w-[335px] w-full bg-white flex py-4 items-center">
        <div onClick={onClose} className="cursor-pointer">
          <Image
            src="/svg/icons/caret_left.svg"
            width={24}
            height={24}
            alt="back"
            className="-translate-x-2"
          />
        </div>
        <div className="text-14 mx-auto">2023년 1월 14일 (토)</div>
        <div className="w-6 aspect-square"></div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div className="text-12 font-medium text-gray-6">전체 12명 응답</div>
        <div className="text-12 items-center flex font-medium translate-x-1 text-gray-6">
          <p>시간 순</p>
          <Image
            src="/svg/icons/caret_down.svg"
            width={18}
            height={18}
            alt="down"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex flex-col">
          <div className="flex justify-between font-14 items-center">
            <div>18:00 - 18:30</div>
            <div>2명</div>
          </div>
          <div className="text-12 mt-1.5 text-gray-6">지수, 태준</div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between font-14 items-center">
            <div>18:30 - 19:00</div>
            <div>2명</div>
          </div>
          <div className="text-12 mt-1.5 text-gray-6">지수, 태준</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3"></div>
    </Layout>
  );
}
