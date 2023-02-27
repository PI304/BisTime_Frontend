import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import Loader from '@components/common/Loader';

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);
  const [chosenDays, setChosenDays] = useState([]);
  const router = useRouter();
  const { uuid } = router.query;

  const { data, isLoading } = useGetEventQuery(uuid as string);

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
    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.unshift('');
    }
    for (let i = lastDayIndex; i < 6; i++) {
      daysArray.push('');
    }
    setDays(daysArray);

    if (data && data.availability) {
      const chosenDaysArray = daysArray.map((day) => {
        if (day !== '') return false;
      });

      Object.keys(data?.availability).forEach((key) => {
        const dateArray = key.split('-');
        if (+dateArray[0] === year && +dateArray[1] === month + 1) {
          chosenDaysArray[+dateArray[2] + firstDayIndex - 1] = true;
        }
      });

      setChosenDays(chosenDaysArray);
    }
  }, [month, year, data, isLoading]);

  useEffect(() => {
    if (data && data.availability) {
      const firstMonth = +Object.keys(data?.availability)[0].split('-')[1] - 1;
      setMonth(firstMonth);
    }
  }, [data]);

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

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full justify-between items-center">
        <span className="text-primary-green-3">
          {year}년 {month + 1}월
        </span>
        <div className="text-primary-green-3 cursor-pointer flex">
          <svg
            onClick={prevMonth}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <svg
            onClick={nextMonth}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3 w-full mt-2 text-h3 p-4 rounded-lg text-primary-green-3 bg-secondary-orange-3">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            className="py-[2px] rounded-full flex items-center justify-center"
            key={index}
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`relative rounded-full flex items-center py-1 justify-center transition`}
          >
            {day}
            {chosenDays[index] && (
              <div className="absolute w-[6px] h-[6px] rounded-full bg-primary-green-1 bottom-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
