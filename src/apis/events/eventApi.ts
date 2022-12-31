import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import {
  EventDateParamDTOType,
  EventDTOType,
  EventParamGetType,
  EventParamPatchType,
} from './eventApi.type';

export class EventApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async getEventList(params: EventParamGetType): Promise<EventDTOType[]> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/events`,
      params,
    });
    return data;
  }

  async getEventById(id: string): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'GET',
      url: `/events/${id}`,
    });
    return data;
  }

  async postEvent(body: EventDTOType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/events`,
      data: body,
    });
    return data;
  }

  async patchEvent(req: EventParamPatchType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/events/${req.id}`,
      data: req.data,
    });
    return data;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/events/${id}`,
    });
    return data;
  }

  async postEventDate(req: EventDateParamDTOType): Promise<EventDTOType> {
    const { data } = await this.axios({
      method: 'POST',
      url: `/events/${req.id}/dates`,
      data: req.data,
    });
    return data;
  }
}

const eventApi = new EventApi();

export default eventApi;
