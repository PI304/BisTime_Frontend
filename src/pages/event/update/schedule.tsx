import { useRouter } from 'next/router';
import Layout from '@components/common/Layout/Layout';
import Button from '@components/common/Button';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { useEffect } from 'react';
import ScheduleCalender from '@components/update/calender-schedule';
import useSWR from 'swr';
import Navigate from '@components/common/Navigate/Navigate';
import Loader from '@components/common/Loader/Loader';
import { setMembers } from '@features/event/eventSlice';

type EventScheduleResult = {
  name: string;
  date: string;
  availability: string;
};
interface EventScheduleResponse {
  results: EventScheduleResult[];
}

function Schedule() {
  const router = useRouter();
  const { data, isLoading } = useSWR<EventScheduleResponse>(
    `/api/events/${router.query.uuid}/schedules`,
  );

  const eventState = useAppSelector((state) => state.event);
  const scheduleState = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;
    if (data.results.length === 0) return;
    const members = new Set<string>();
    const { results } = data;
    results.forEach((result) => {
      members.add(result.name);
    });
    const membersArray = [...members];
    dispatch(setMembers(membersArray));
  }, [data, isLoading, dispatch]);

  const { uuid } = router.query;
  useEffect(() => {
    if (!uuid) return;
    if (
      scheduleState.name === '' ||
      Object.keys(scheduleState.availability).length === 0
    ) {
      router.push(`/events/update?uuid=${uuid}`);
    }
  }, [scheduleState.name, router, scheduleState.availability, uuid]);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <Navigate
        left="back"
        center="title"
        title={eventState.title}
        right="user"
        user={scheduleState.name}
      />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center my-16">
          <h1 className="text-h2 font-normal text-center text-base-black">
            Check Your Schedule
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ScheduleCalender />
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <Button
            onClick={() => {
              router.push(`/events/update/checkschedule?uuid=${uuid}`);
            }}
          >
            Start
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
