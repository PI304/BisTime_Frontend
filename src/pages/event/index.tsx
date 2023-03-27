import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate';
import DashBoard from '@components/event/DashBoard';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useRouter } from 'next/router';
import { formatDateWithDayOfWeek } from '@utils/formatDate';
import { useGetScheduleQuery } from '@apis/schedule/scheduleApi.query';
import { useEffect, useState } from 'react';
import { FloatButton } from '@components/common/Button';

import {
  scheduleListToAvailableMember,
  scheduleListToMembers,
} from '@utils/scheduleAsMember';

const TIMETABLE = [
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

export default function Event() {
  const router = useRouter();
  const { uuid } = router.query;

  const { data: event, isLoading } = useGetEventQuery(uuid as string);
  const { data: scheduleList } = useGetScheduleQuery(uuid as string);
  const members = scheduleListToMembers(scheduleList || []);
  const startIndex = TIMETABLE.indexOf(event?.startTime || '00:00');
  const endIndex = TIMETABLE.indexOf(event?.endTime || '00:00');
  const [availableMember, setAvailableMember] = useState({});

  useEffect(() => {
    if (scheduleList && event) {
      const detail = scheduleListToAvailableMember(scheduleList, event);
      setAvailableMember(detail);
    }
  }, [scheduleList, event]);

  if (isLoading) return <Loader />;

  return (
    <Layout className="relative">
      <Navigate link />
      <FloatButton
        type="add"
        onClick={() => {
          router.push({
            pathname: '/event/schedule/add01',
            query: { uuid: uuid },
          });
        }}
      />

      <div className="w-full flex flex-wrap flex-col mt-2">
        <div className="w-full flex items-center justify-center">
          <div className="text-24">{event?.title}</div>
        </div>
        <div className="text-14 mt-2 flex flex-col justify-between border-primary-green-1">
          <p className="mb-1">참여하는 사람 : {members.length}명</p>
          <div className="flex text-11 font-light flex-wrap">
            {members.join(', ')}
          </div>
        </div>
        <div>
          {Object.keys(event?.availability || {}).map((date) => (
            <DashBoard
              key={date}
              members={members}
              date={formatDateWithDayOfWeek(date)}
              mapKey={date}
              startIdx={startIndex}
              endIdx={endIndex}
              availability={event?.availability[date]}
              detail={availableMember[date]}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
