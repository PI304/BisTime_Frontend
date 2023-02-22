import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import scheduleApi from './scheduleApi';
import { ScheduleResponse } from './scheduleApi.type';

export const useGetScheduleQuery = (uuid: string) => {
  return useQuery<ScheduleResponse, AxiosError, Schedule[]>(
    ['schedule', uuid],
    () => scheduleApi.getSchedule(uuid),
    {
      select: (data) => data.results,
    },
  );
};
