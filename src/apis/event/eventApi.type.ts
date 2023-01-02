export type EventDTOType = {
  title: string;
  start_time: string;
  end_time: string;
};

export type EventParamGetType = {};
export type EventParamPutType = {
  id: string;
  data: EventDTOType;
};

export type EventParamPatchType = {
  id: string;
  data: Partial<EventDTOType>;
};

type DateDTOType = {
  additional_dates: string[];
};

export type EventDate = {
  id: string;
  event: EventDTOType;
  date: DateDTOType;
};

export type EventDateParamDTOType = {
  id: string;
  data: DateDTOType;
};
