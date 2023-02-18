import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import eventApi from './eventApi';
import { EventDatePostParam } from './eventApi.type';
export const usePostEventMutation = () => {
  const router = useRouter();
  return useMutation<Event, AxiosError, Partial<Event>>(
    ['event'],
    (body) => eventApi.postEvent(body),
    {
      onSuccess: (data) => {
        router.push({
          pathname: `/event/create/summary`,
          query: { uuid: data.uuid },
        });
      },
    },
  );
};

export const usePostEventDateMutation = (uuid: string) => {
  return useMutation<Event, AxiosError, EventDatePostParam>(['event'], (body) =>
    eventApi.postEventDate(uuid, body),
  );
};
