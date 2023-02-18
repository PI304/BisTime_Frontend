import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import eventApi from './eventApi';
import { Event } from './eventApi.type';
export const usePostEventMutation = () => {
  return useMutation<Event, AxiosError, Partial<Event>>(
    ['event'],
    (body) => eventApi.postEvent(body),
    {
      onSuccess: (data) => {
        console.log('data', data);
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );
};
