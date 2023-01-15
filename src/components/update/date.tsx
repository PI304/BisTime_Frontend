import { getDay } from '@utils/calender';

interface DateProps {
  date: string;
  className?: string;
}

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Date({ date, className }: DateProps) {
  const dateArray = date.split('-');
  const day = dateArray[2];
  const month = dateArray[1];
  const year = dateArray[0];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-[60px] font-normal">{day}</div>
      <div className="ml-3 text-[16px] text-gray-6 font-normal leading-5">
        {getDay(+year, +month - 1, +day)} <br />
        {MONTH[+month - 1]} <br />
        {year}
      </div>
    </div>
  );
}
