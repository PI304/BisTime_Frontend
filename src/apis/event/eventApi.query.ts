import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import eventApi from './eventApi';

export const useGetEventQuery = (uuid: string) => {
  return useQuery<Event, AxiosError>(['event', uuid], () =>
    eventApi.getEventById(uuid),
  );
};
