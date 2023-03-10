import instance from '@apis/_axios/instance';

import { EventDatePostParam, EventPatchParam } from './eventApi.type';

export class EventApi {
  async getEventList(): Promise<Event[]> {
    const { data } = await instance({
      method: 'GET',
      url: `/api/events`,
    });
    return data;
  }

  async postEvent(body: Partial<Event>): Promise<Event> {
    const { data } = await instance({
      method: 'POST',
      url: `/api/events`,
      data: body,
    });
    return data;
  }

  async getEventById(uuid: string): Promise<Event> {
    const { data } = await instance({
      method: 'GET',
      url: `/api/events/${uuid}`,
    });
    return data;
  }

  async postEventDate(uuid: string, body: EventDatePostParam): Promise<Event> {
    const { data } = await instance({
      method: 'POST',
      url: `/api/events/${uuid}/dates`,
      data: body,
    });
    return data;
  }

  async patchEvent(req: EventPatchParam): Promise<Event> {
    const { data } = await instance({
      method: 'PATCH',
      url: `/api/events/${req.id}`,
      data: req.data,
    });
    return data;
  }

  async deleteEvent(uuid: string): Promise<boolean> {
    const { data } = await instance({
      method: 'DELETE',
      url: `/api/events/${uuid}`,
    });
    return data;
  }

  async getEventDateById(uuid: string): Promise<EventDate> {
    const { data } = await instance({
      method: 'GET',
      url: `/api/events/${uuid}/dates`,
    });
    return data;
  }
}

const eventApi = new EventApi();

export default eventApi;
