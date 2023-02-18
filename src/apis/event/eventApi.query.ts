import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import eventApi from './eventApi';

export const useGetEventDateQuery = (uuid: string) => {
  return useQuery<EventDate, AxiosError>(['event', uuid], () =>
    eventApi.getEventById(uuid),
  );
};
