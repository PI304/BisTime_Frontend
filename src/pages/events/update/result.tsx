import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Navigate from '@components/common/navigate';
import Loader from '@components/common/loader';
import { setMembers } from '@features/event/eventSlice';
import ResultCalender from '@components/update/calender-result';
import Modal from '@components/common/modal';

type EventScheduleResult = {
  name: string;
  date: string;
  availability: string;
};
interface EventScheduleResponse {
  results: EventScheduleResult[];
}

export default function Result() {
  const router = useRouter();
  const { data, isLoading } = useSWR<EventScheduleResponse>(
    `/api/events/${router.query.uuid}/schedules`,
  );

  const [showModal, setShowModal] = useState(false);

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

  const onAccept = () => {
    setShowModal(false);
    console.log('accept');
    // router.push(`/events/update?uuid=${router.query.uuid}`);
  };

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
      <Modal
        isModal={showModal}
        onCloseModal={() => setShowModal(false)}
        onAccept={onAccept}
      />
      <Navigate
        left="back"
        center="title"
        title={eventState.title}
        right="user"
        user={scheduleState.name}
        className={`${showModal ? 'hidden' : ''}`}
      />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex items-center justify-center">
          <ResultCalender />
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <Button
            className={`${showModal ? 'hidden' : ''}`}
            onClick={() => setShowModal(true)}
          >
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
}
