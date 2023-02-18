export type Event = {
  id: number;
  uuid: string;
  title: string;
  startTime: string;
  endTime: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
};

export type EventGetParam = {};
export type EventPutParam = {
  id: string;
  data: Event;
};
export type EventPatchParam = {
  id: string;
  data: Partial<Event>;
};

type Date = {
  additionalDates: string[];
};

export type EventDate = {
  id: string;
  event: Event;
  date: Date;
  createdAt: string;
  updatedAt: string;
};

export type EventDatePostParam = {
  id: string;
  data: Date;
};
