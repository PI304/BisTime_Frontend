import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useRouter } from 'next/router';
import Calender from '@components/event/Calender';
import { useAppDispatch } from '@features/hooks';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useEffect } from 'react';
import { setAvailability } from '@features/schedule/scheduleSlice';

export default function Add() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: event, isLoading } = useGetEventQuery(
    router.query.uuid as string,
  );

  useEffect(() => {
    if (event) {
      const availability = [];
      Object.keys(event.availability).forEach((key) => {
        availability.push(event.availability[key].split(''));
      });
      dispatch(setAvailability(availability));
    }
  }, [event]);

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
