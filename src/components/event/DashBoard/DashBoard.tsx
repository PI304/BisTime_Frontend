import Image from 'next/image';

interface DashBoardProps {
  date: string;
  members: string[];
  startIdx: number;
  endIdx: number;
  availability: string;
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

function getOpacity(n, x) {
  if (x === 0) {
    return 0.1;
  }
  const result = Math.round((n / x) * 10) / 10;
  return Math.max(0.1, Math.min(1.0, result));
}

export default function DashBoard({
  date,
  members,
  startIdx,
  endIdx,
  availability,
}: DashBoardProps) {
  console.log(availability);

  return (
    <div className="mt-4">
      <div className="text-12">{date}</div>
      <div className="grid grid-cols-6 grid-rows-1">
        {members &&
          availability
            ?.slice(startIdx, endIdx)
            .split('')
            .map((availalbe, index) => {
              const opacity = +availalbe / members.length;
              console.log(opacity);
              const time =
                startIdx + (index % 2) === 0
                  ? TIMETABLE[startIdx + index].slice(0, 2)
                  : '';
              return (
                <div key={index}>
                  {time !== '' ? (
                    <p className={`text-left font-light text-10 h-4 relative`}>
                      {time}
                    </p>
                  ) : (
                    <Image
                      src="/svg/icons/triangle.svg"
                      width={8}
                      height={8}
                      alt="triangle"
                      className="h-4 -translate-x-1 "
                    />
                  )}
                  <div
                    className={`w-full aspect-square  bg-primary-green-1 bg-opa bg-opacity-[${getOpacity(
                      members.length,
                      +availalbe,
                    )}]`}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}
