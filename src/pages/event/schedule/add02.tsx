import { Button } from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import Calender from '@components/event/Calender';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useEffect } from 'react';
import { setAvailability } from '@features/schedule/scheduleSlice';
import { useGetScheduleQuery } from '@apis/schedule/scheduleApi.query';

export default function Add() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector((state) => state.schedule);

  const uuid = router.query.uuid as string;

  const { data: event } = useGetEventQuery(uuid as string);
  const { data: scheduleList } = useGetScheduleQuery(uuid as string);
  const isDirty = scheduleState.isDirty;

  useEffect(() => {
    if (!uuid) return;
    if (!scheduleState.name) router.push(`/event/?uuid=${uuid}`);
  }, [scheduleState.name, router, uuid]);

  useEffect(() => {
    if (!scheduleList || !event) return;

    if (event) {
      const availability = [];
      Object.keys(event.availability).forEach((key) => {
        availability.push(new Array(48).fill('0'));
      });

      if (scheduleState.availability.length === 0)
        dispatch(setAvailability(availability));
    }

    if (isDirty) return;

    const newAvailability = [];

    scheduleList.map((schedule) => {
      if (schedule.name !== scheduleState.name) return;
      newAvailability.push(schedule.availability.split(''));
    });

    if (newAvailability?.length > 0) dispatch(setAvailability(newAvailability));
  }, [event, scheduleList, isDirty]);

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-2/3" className="mt-3" />
      <div className="mt-6 w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">날짜를 확인하고</div>
          <div className="text-18 text-left w-full">일정을 등록해주세요.</div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Calender />
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button
            onClick={() =>
              router.push({
                pathname: '/event/schedule/add03',
                query: { uuid: router.query.uuid },
              })
            }
          >
            다음
          </Button>
        </div>
      </div>
    </Layout>
  );
}
