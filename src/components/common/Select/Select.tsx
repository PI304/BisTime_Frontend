import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import type {
  FieldPath,
  UseFormSetValue,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  options: { value: string }[];
}

export default function Select<T extends FieldValues>({
  name,
  setValue,
  options,
}: SelectProps<T>) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  useEffect(() => {
    if (selected !== undefined)
      setValue(name, selected as FieldPathValue<T, FieldPath<T>>);
  }, [selected, name, setValue]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-16 h-10 text-primary-green-3 cursor-default rounded-md text-[15px] bg-secondary-orange-3 p-[1.5px] text-center focus:outline-none focus-visible:border-primary-green-1 ">
            <span className="block truncate">{selected.value}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 overflow-auto scrollbar-none scrollbar-track-transparent scrollbar-thumb-primary-green-1 scrollbar-thumb-rounded max-h-40 w-full rounded-md bg-secondary-orange-3 text-[15px]">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none p-2 text-center ${
                      active
                        ? 'bg-primary-green-1 text-white'
                        : 'text-primary-green-3'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.value}
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
