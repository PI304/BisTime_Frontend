interface Event {
  id: number;
  uuid: string;
  title: string;
  startTime: string;
  endTime: string;
  availability: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface EventDate {
  id: string;
  event: Event;
  date: Date;
  createdAt: string;
  updatedAt: string;
}
