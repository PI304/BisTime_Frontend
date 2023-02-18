import React from 'react';
import { useEffect, useState } from 'react';

import Select from '../Select';
import Toggle from './Toggle';

import type { FieldPath, UseFormSetValue, FieldValues } from 'react-hook-form';
const dayTimeZone = [
  { value: '00:00' },
  { value: '00:30' },
  { value: '01:00' },
  { value: '01:30' },
  { value: '02:00' },
  { value: '02:30' },
  { value: '03:00' },
  { value: '03:30' },
  { value: '04:00' },
  { value: '04:30' },
  { value: '05:00' },
  { value: '05:30' },
  { value: '06:00' },
  { value: '06:30' },
  { value: '07:00' },
  { value: '07:30' },
  { value: '08:00' },
  { value: '08:30' },
  { value: '09:00' },
  { value: '09:30' },
  { value: '10:00' },
  { value: '10:30' },
  { value: '11:00' },
  { value: '11:30' },
  { value: '12:00' },
];

const nightTimeZone = [
  { value: '13:00' },
  { value: '13:30' },
  { value: '14:00' },
  { value: '14:30' },
  { value: '15:00' },
  { value: '15:30' },
  { value: '16:00' },
  { value: '16:30' },
  { value: '17:00' },
  { value: '17:30' },
  { value: '18:00' },
  { value: '18:30' },
  { value: '19:00' },
  { value: '19:30' },
  { value: '20:00' },
  { value: '20:30' },
  { value: '21:00' },
  { value: '21:30' },
  { value: '22:00' },
  { value: '22:30' },
  { value: '23:00' },
  { value: '23:30' },
  { value: '24:00' },
];

interface TimePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  dayOrNight: boolean;
  label?: string;
  className?: string;
}

export default function TimePicker<T extends FieldValues>({
  name,
  setValue,
  dayOrNight,
  label,
  className,
}: TimePickerProps<T>) {
  const [isDayOrNight, setIsDayOrNight] = useState(dayOrNight);
  const [options, setOptions] = useState(dayTimeZone);

  useEffect(() => {
    if (isDayOrNight) setOptions(nightTimeZone);
    else setOptions(dayTimeZone);
  }, [isDayOrNight]);

  return (
    <div className="flex flex-col">
      <div className="text-16 text-primary-green-3 text-left w-full">
        {label}
      </div>
      <div className={`flex justify-center items-center ${className}`}>
        <Select name={name} setValue={setValue} options={options} />
        <Toggle
          enabled={isDayOrNight}
          onClick={() => {
            setIsDayOrNight(!isDayOrNight);
          }}
          toggleMenu={['오전', '오후']}
          className="ml-1"
        />
      </div>
    </div>
  );
}
