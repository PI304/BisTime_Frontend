import Layout from '@components/common/Layout';
import Image from 'next/image';
interface DashBoardModalProps {
  onClose: () => void;
  date: string;
  startIdx: number;
  detail: string[][];
}

const TIMETABLE = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

export default function DashBoardModal({
  date,
  startIdx,
  detail,
  onClose,
}: DashBoardModalProps) {
  const members = new Set(detail?.flat());

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
        <div className="text-14 mx-auto">{date}</div>
        <div className="w-6 aspect-square"></div>
      </div>
      <div className="flex justify-between w-full mt-2">
        <div className="text-12 font-medium text-gray-6">
          전체 {members?.size}명 응답
        </div>
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
      <div className="flex flex-col space-y-5 mt-5">
        {detail?.map((members, index) => {
          const idx = startIdx + index;
          return (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between font-14 items-center">
                <div>{TIMETABLE[idx] + ' - ' + TIMETABLE[idx + 1]}</div>
                <div>{members.length}명</div>
              </div>
              <div className="text-12 mt-1.5 text-gray-6">
                {members.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3"></div>
    </Layout>
  );
}
