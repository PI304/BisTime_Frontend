import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import scheduleApi from './scheduleApi';

export const useGetScheduleQuery = (uuid: string) => {
  return useQuery<Schedule[], AxiosError, Schedule[]>(['schedule', uuid], () =>
    scheduleApi.getSchedule(uuid),
  );
};
