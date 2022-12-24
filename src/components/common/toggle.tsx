import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="relative inline-flex text-primary-green-3 text-h3 justify-around h-10 w-24 items-center rounded-md bg-secondary-orange-3"
    >
      <span>AM</span>
      <span>PM</span>
      <span
        className={`${
          enabled ? 'translate-x-12' : 'translate-x-1'
        } absolute -left-0 flex justify-center items-center text-h3 h-8 w-11 transform rounded-md text-white bg-primary-green-1 transition`}
      >
        {enabled ? 'PM' : 'AM'}
      </span>
    </Switch>
  );
}
