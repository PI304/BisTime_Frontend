import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate';
import DashBoard from '@components/event/DashBoard';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useRouter } from 'next/router';
import { formatDate, formatDateWithDayOfWeek } from '@utils/formatDate';
import { useGetScheduleQuery } from '@apis/schedule/scheduleApi.query';
import { useEffect, useState } from 'react';
import { FloatButton } from '@components/common/Button';
import Drawer from '@components/common/Drawer';
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

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}

export default function Event({ query }) {
  const router = useRouter();

  const { uuid } = query;
  const { data: event, isLoading } = useGetEventQuery(uuid as string);
  const { data: scheduleList } = useGetScheduleQuery(uuid as string);
  const members = scheduleListToMembers(scheduleList || []);
  const startIndex = TIMETABLE.indexOf(event?.startTime || '00:00');
  const endIndex = TIMETABLE.indexOf(event?.endTime || '00:00');
  const [availableMember, setAvailableMember] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
        onClick={() =>
          router.push({
            pathname: '/event/schedule/add01',
            query: { uuid: uuid },
          })
        }
      />
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        하이
      </Drawer>
      <FloatButton type="filter" onClick={() => setIsOpen(true)} />
      <div className="w-full flex flex-wrap flex-col mt-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-24">{event?.title}</div>
            <div className="flex flex-col ml-2 ju font-light text-gray-7 text-8">
              <p>{formatDate(event?.createdAt)}</p>
              <p>{members ? `${members.length}명 응답` : ''}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
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
