import { useEffect, useState } from 'react';
import Select from './select';
import Toggle from './toggle';

const dayTimeZone = [
  { value: '00:00' },
  { value: '01:00' },
  { value: '02:00' },
  { value: '03:00' },
  { value: '04:00' },
  { value: '05:00' },
  { value: '06:00' },
  { value: '07:00' },
  { value: '08:00' },
  { value: '09:00' },
  { value: '10:00' },
  { value: '11:00' },
  { value: '12:00' },
];

const nightTimeZone = [
  { value: '13:00' },
  { value: '14:00' },
  { value: '15:00' },
  { value: '16:00' },
  { value: '17:00' },
  { value: '18:00' },
  { value: '19:00' },
  { value: '20:00' },
  { value: '21:00' },
  { value: '22:00' },
  { value: '23:00' },
  { value: '24:00' },
];

export default function TimePicker() {
  const [dayOrNight, setDayOrNight] = useState(true);
  const [options, setOptions] = useState(dayTimeZone);

  useEffect(() => {
    if (dayOrNight) setOptions(nightTimeZone);
    else setOptions(dayTimeZone);
  }, [dayOrNight, setOptions]);

  return (
    <div className="flex justify-center items-center">
      <Select options={options} />
      <Toggle
        enabled={dayOrNight}
        onClick={() => {
          setDayOrNight((prev) => !prev);
        }}
        toggleMenu={['AM', 'PM']}
        className="ml-1"
      />
    </div>
  );
}
