import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import scheduleApi from './scheduleApi';
import { SchedulePostParam } from './scheduleApi.type';

export const usePostScheduleMutation = (uuid: string) => {
  const router = useRouter();
  return useMutation<Schedule[], AxiosError, SchedulePostParam>(
    ['schedule', uuid],
    (body) => scheduleApi.postSchedule(uuid, body),
    {
      onSuccess: () => {
        router.push({
          pathname: '/event',
          query: { uuid },
        });
      },
    },
  );
};
