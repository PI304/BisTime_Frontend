import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import eventApi from './eventApi';

export const useGetEventQuery = (uuid: string) => {
  return useQuery<Event, AxiosError>(
    ['event', uuid],
    () => eventApi.getEventById(uuid),
    {
      select: (data) => {
        const sortedDates = Object.keys(data.availability).sort();
        const sortedObj = sortedDates.reduce((obj, key) => {
          obj[key] = data.availability[key];
          return obj;
        }, {});
        return { ...data, availability: sortedObj };
      },
    },
  );
};
