import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import eventApi from './eventApi';
import { EventDate } from './eventApi.type';

export const useGetEventDateQuery = (uuid: string) => {
  return useQuery<EventDate, AxiosError>(['event', uuid], () =>
    eventApi.getEventById(uuid),
  );
};
