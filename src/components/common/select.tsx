import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const timezone = [
  { time: '00:00' },
  { time: '01:00' },
  { time: '02:00' },
  { time: '03:00' },
  { time: '04:00' },
  { time: '05:00' },
  { time: '06:00' },
  { time: '07:00' },
  { time: '08:00' },
  { time: '09:00' },
  { time: '10:00' },
  { time: '11:00' },
  { time: '12:00' },
];

export default function Select() {
  const [selected, setSelected] = useState(timezone[0]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-16 h-10 text-primary-green-3 cursor-default rounded-md text-h3 bg-secondary-orange-3 p-[1.5px] text-center focus:outline-none focus-visible:border-primary-green-1 ">
            <span className="block truncate">{selected.time}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 overflow-auto scrollbar-none scrollbar-track-transparent scrollbar-thumb-primary-green-1 scrollbar-thumb-rounded max-h-40 w-full rounded-md bg-secondary-orange-3 text-h3">
              {timezone.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none p-2 text-center ${
                      active
                        ? 'bg-primary-green-1 text-white'
                        : 'text-primary-green-3'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.time}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
