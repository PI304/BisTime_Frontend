interface Event {
  id: number;
  uuid: string;
  title: string;
  startTime: string;
  endTime: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
}

interface Date {
  additionalDates: string[];
}

interface EventDate {
  id: string;
  event: Event;
  date: Date;
  createdAt: string;
  updatedAt: string;
}
