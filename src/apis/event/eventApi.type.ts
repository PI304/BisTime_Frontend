export type EventGetParam = {};
export type EventPutParam = {
  id: string;
  data: Event;
};
export type EventPatchParam = {
  id: string;
  data: Partial<Event>;
};

export type EventDatePostParam = {
  additionalDates: string[];
};
