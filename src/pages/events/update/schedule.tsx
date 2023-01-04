import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import { useEffect, useState } from 'react';
import ScheduleCalender from '@components/update/calender-schedule';
import { eventState } from '@features/event/eventSlice';
import useSWR from 'swr';

const TIMEZONE = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

function Schedule() {
  const { setValue, handleSubmit, watch } = useForm();
  const router = useRouter();
  const { data, isLoading } = useSWR<eventState>(
    `/api/events/${router.query.uuid}}/`,
  );
  const [event, setEvent] = useState<eventState>();
  const [timeTable, setTimeTable] = useState([]);
  const [availability, setAvailability] = useState<boolean[]>([]);

  useEffect(() => {
    if (isLoading) return;
    setEvent(data);
  }, [data, isLoading]);

  useEffect(() => {
    if (!event) return;
    const startIndex = TIMEZONE.indexOf(event.start_time);
    const endIndex = TIMEZONE.indexOf(event.end_time);
    const timeRange = TIMEZONE.slice(startIndex, endIndex + 1);
    const possibleArray = timeRange.map(() => false);
    setAvailability(possibleArray);
    setTimeTable(timeRange);
  }, [event]);

  // availability to string for backend
  useEffect(() => {
    if (!event) return;
    let availabilityString = availability.map((a) => (a ? '1' : '0')).join('');
    const startIndex = TIMEZONE.indexOf(event.start_time);
    for (let i = 0; i < startIndex; i++) {
      availabilityString = '0' + availabilityString;
    }
    const endIndex = TIMEZONE.indexOf(event.end_time);
    for (let i = 0; i < 47 - endIndex; i++) {
      availabilityString = availabilityString + '0';
    }
    setValue('availability', availabilityString);
  }, [availability, event, setValue]);

  const watchAllFields = watch('availability');
  console.log(watchAllFields);

  const scheduleState = useAppSelector((state) => state.schedule);

  const onTimeTableClick = (time: string) => {
    const index = timeTable.indexOf(time);
    const newAvailability = [...availability];
    newAvailability[index] = !newAvailability[index];
    setAvailability(newAvailability);
  };

  const onValid = (form) => {
    router.push('/events/create/summary');
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h1 className="text-display font-bold text-center text-base-black">
            Event Title
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ScheduleCalender />
        </div>
        {scheduleState.current !== '' && (
          <div className="flex flex-col w-full space-y-2 mt-2 h-[368px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-green-1 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {timeTable.map((time, index) => (
              <div
                key={index}
                onClick={() => {
                  onTimeTableClick(time);
                }}
                className="flex justify-between"
              >
                <div className="h-14 flex text-primary-green-3 ml-1">
                  {time}
                </div>
                <div
                  className={`w-4/5 rounded-lg h-14 mr-2 ${
                    availability[index]
                      ? 'bg-primary-green-1'
                      : 'bg-secondary-orange-3'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <Button>Submit</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
