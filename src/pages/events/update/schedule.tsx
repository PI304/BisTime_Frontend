import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { useEffect, useState } from 'react';
import ScheduleCalender from '@components/update/calender-schedule';
import { eventState } from '@features/event/eventSlice';
import { setAvailability as setScheduleAvailability } from '@features/schedule/scheduleSlice';
import useSWR from 'swr';
import useMutation from '@apis/useMutation';

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

interface Scheule {
  name: string;
  availability: string[];
}

function Schedule() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<eventState>(
    `/api/events/${router.query.uuid}}/`,
  );

  const [updateSchedule, { data: updateData, error, loading }] = useMutation(
    `/api/events/${router.query.uuid}/schedules/`,
  );

  // 이벤트 정보 가져옴
  const [event, setEvent] = useState<eventState>();
  const [timeTable, setTimeTable] = useState([]);

  // 유저 스케줄 가져옴 여기서는 사용하지 않음
  const [schedule, setSchedule] = useState<Scheule>();

  const scheduleState = useAppSelector((state) => state.schedule);
  console.log(scheduleState);

  useEffect(() => {
    if (isLoading) return;
    setEvent(data);
  }, [data, isLoading]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoading) return;
    if (!event) return;
    const startIndex = TIMEZONE.indexOf(event.start_time);
    const endIndex = TIMEZONE.indexOf(event.end_time);
    const timeRange = TIMEZONE.slice(startIndex, endIndex + 1);
    setTimeTable(timeRange);
  }, [event, isLoading]);

  const onTimeTableClick = (time: string) => {
    const index = TIMEZONE.indexOf(time);
    const availability = scheduleState.availability[scheduleState.current];
    const newAvailability =
      availability.slice(0, index) +
      (availability[index] === '0' ? '1' : '0') +
      availability.slice(index + 1);
    dispatch(
      setScheduleAvailability({
        date: scheduleState.current,
        availability: newAvailability,
      }),
    );
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
            {event && event.title ? event.title : 'Event Title'}
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
                    scheduleState.availability[scheduleState.current][
                      TIMEZONE.indexOf(time)
                    ] === '1'
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
