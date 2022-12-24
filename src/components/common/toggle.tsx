import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="relative inline-flex text-primary-green-3 text-h3 justify-around h-10 w-[94px] items-center rounded-md bg-secondary-orange-3"
    >
      AM : PM
      <span
        className={`${
          enabled ? 'translate-x-11' : 'translate-x-[2px]'
        } absolute -left-0 flex justify-center items-center text-h3 h-9 w-12 transform rounded-md text-white bg-primary-green-1 transition`}
      >
        {enabled ? 'PM' : 'AM'}
      </span>
    </Switch>
  );
}
