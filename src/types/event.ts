export interface Event {
  uuid: string;
  title: string;
  start_time: string;
  end_time: string;
  additional_dates: string[];
  availability: object;
  members: string[];
}

export interface EventDate {}

export interface Schedule {}
