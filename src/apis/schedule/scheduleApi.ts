import instance from '@apis/_axios/instance';

import { SchedulePostParam, ScheduleResponse } from './scheduleApi.type';

export class ScheduleApi {
  async getSchedule(uuid: string): Promise<ScheduleResponse> {
    const { data } = await instance({
      method: 'GET',
      url: `/api/events/${uuid}/schedules/`,
    });
    return data;
  }
  async postSchedule(
    uuid: string,
    body: SchedulePostParam,
  ): Promise<Schedule[]> {
    const { data } = await instance({
      method: 'POST',
      url: `/api/events/${uuid}/schedules/`,
      data: body,
    });
    return data;
  }
}

const scheduleApi = new ScheduleApi();

export default scheduleApi;
