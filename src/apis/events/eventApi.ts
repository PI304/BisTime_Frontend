import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import {
  EventDateParamDTOType,
  EventDTOType,
  EventParamPatchType,
} from './eventApi.type';

export class EventApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async getEventList(): Promise<EventDTOType[]> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/api/events`,
    });
    return data;
  }

  async getEventById(id: string): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/api/events/${id}`,
    });
    return data;
  }

  async postEvent(body: EventDTOType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/api/events`,
      data: body,
    });
    return data;
  }

  async patchEvent(req: EventParamPatchType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/api/events/${req.id}`,
      data: req.data,
    });
    return data;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/api/events/${id}`,
    });
    return data;
  }

  async postEventDate(req: EventDateParamDTOType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/api/events/${req.id}/dates`,
      data: req.data,
    });
    return data;
  }
}

const eventApi = new EventApi();

export default eventApi;
