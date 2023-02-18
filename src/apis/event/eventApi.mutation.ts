import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import eventApi from './eventApi';
import { Event } from './eventApi.type';
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
