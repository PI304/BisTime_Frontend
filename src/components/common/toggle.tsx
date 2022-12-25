import { useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleProps {
  enabled?: boolean;
  toggleMenu?: string[];
  className?: string;
  [key: string]: any;
}

export default function Toggle({
  enabled,
  toggleMenu,
  className,
  ...rest
}: ToggleProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  return (
    <Switch
      checked={enabled}
      onChange={setIsEnabled}
      {...rest}
      className={
        `relative inline-flex text-primary-green-3 text-h3 justify-around h-10 w-24 items-center rounded-md bg-secondary-orange-3` +
        (className ? ` ${className}` : '')
      }
    >
      {toggleMenu ? (
        <div className="inline-flex justify-around w-full">
          <span>{toggleMenu[0]}</span>
          <span>{toggleMenu[1]}</span>
        </div>
      ) : (
        <div className="inline-flex justify-around w-full">
          <span>OFF</span>
          <span>ON</span>
        </div>
      )}
      <span
        className={`${
          isEnabled ? 'translate-x-12' : 'translate-x-1'
        } absolute -left-0 flex justify-center items-center text-h3 h-8 w-11 transform rounded-md text-white bg-primary-green-1 transition`}
      >
        {toggleMenu ? (
          <span className="text-h3">
            {isEnabled ? toggleMenu[1] : toggleMenu[0]}
          </span>
        ) : (
          <span className="text-h3">{isEnabled ? 'ON' : 'OFF'}</span>
        )}
      </span>
    </Switch>
  );
}
