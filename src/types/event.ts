export interface Event {
  uuid: string;
  title: string;
  start_time: string;
  end_time: string;
  additional_dates: string[];
  availability: object;
}

export interface EventDate {}

export interface Schedule {}
