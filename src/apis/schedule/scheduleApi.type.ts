export type SchedulePostParam = {
  name: string;
  availability: string[];
};

export interface ScheduleResponse {
  count: number;
  next: string;
  previous: string;
  results: Schedule[];
}
