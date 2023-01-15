import { useAppSelector } from '@features/hooks';
import { TIMEZONE } from '@utils/calender';

interface RankMarkerProps {
  date: string;
  className?: string;
}

export default function RankMarker({ date, className }: RankMarkerProps) {
  const eventState = useAppSelector((state) => state.event);
  const availability = eventState.availability[date];

  const possibility = {};

  [...availability].forEach((v, i) => {
    if (possibility[i] === undefined) possibility[i] = v;
  });

  const sortedPossibility = Object.entries(possibility).sort(
    (a, b) => +b[1] - +a[1],
  );

  return (
    <div className="space-y-1">
      {sortedPossibility[0][1] > 0 && (
        <div className="flex space-x-3 items-center">
          <span className="text-[12px] font-bold w-10 flex justify-center items-center align-baseline h-6 rounded bg-primary-green-2 text-primary-green-1">
            1st
          </span>
          <span className="text-[14px] font-bold text-primary-green-1 w-12 text-center">
            {TIMEZONE[sortedPossibility[0][0]]}
          </span>
          <span className="font-medium text-[12px] text-gray-6">
            {sortedPossibility[0][1] + ' people'}
          </span>
        </div>
      )}
      {sortedPossibility[1][1] > 0 && (
        <div className="flex space-x-3 items-center">
          <span className="text-[12px] font-bold w-10 flex justify-center items-center align-baseline h-6 rounded bg-primary-green-2 text-primary-green-1">
            2nd
          </span>
          <span className="text-[14px] font-bold text-primary-green-1 w-12 text-center">
            {TIMEZONE[sortedPossibility[1][0]]}
          </span>
          <span className="font-medium text-[12px] text-gray-6">
            {sortedPossibility[1][1] + ' people'}
          </span>
        </div>
      )}
      {sortedPossibility[2][1] > 0 && (
        <div className="flex space-x-3 items-center">
          <span className="text-[12px] font-bold w-10 flex justify-center items-center align-baseline h-6 rounded bg-primary-green-2 text-primary-green-1">
            3rd
          </span>
          <span className="text-[14px] font-bold text-primary-green-1 w-12 text-center">
            {TIMEZONE[sortedPossibility[2][0]]}
          </span>
          <span className="font-medium text-[12px] text-gray-6">
            {sortedPossibility[2][1] + ' people'}
          </span>
        </div>
      )}
    </div>
  );
}
