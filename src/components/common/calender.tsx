import { useEffect, useState } from 'react';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Aprl',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const numberOfDays = lastDay.getDate();

    const daysArray = [];
    for (let i = 1; i <= numberOfDays; i++) {
      daysArray.push(i);
    }
    console.log(daysArray);

    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.unshift('');
    }
    console.log(daysArray);

    for (let i = lastDayIndex; i < 6; i++) {
      daysArray.push('');
    }
    console.log(daysArray);

    setDays(daysArray);
  }, [month, year]);

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-between items-center">
        <button
          className="text-2xl font-bold text-gray-700"
          onClick={prevMonth}
        >
          {'<'}
        </button>
        <span className="text-2xl font-bold text-gray-700">
          {monthNames[month]} {year}
        </span>
        <button
          className="text-2xl font-bold text-gray-700"
          onClick={nextMonth}
        >
          {'>'}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 w-full mt-4">
        {days.map((day, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
