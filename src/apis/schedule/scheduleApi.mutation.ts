import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useAppDispatch } from '@features/hooks';
import { reset } from '@features/schedule/scheduleSlice';

import scheduleApi from './scheduleApi';
import { SchedulePostParam } from './scheduleApi.type';

export const usePostScheduleMutation = (uuid: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation<Schedule[], AxiosError, SchedulePostParam>(
    ['schedule', uuid],
    (body) => scheduleApi.postSchedule(uuid, body),
    {
      onSuccess: () => {
        dispatch(reset());
        router.push({
          pathname: '/event',
          query: { uuid },
        });
      },
    },
  );
};
