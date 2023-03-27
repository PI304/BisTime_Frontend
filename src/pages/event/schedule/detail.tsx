import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useGetScheduleQuery } from '@apis/schedule/scheduleApi.query';
import Layout from '@components/common/Layout';
import Detail from '@components/event/Detail';
import { scheduleListToAvailableMember } from '@utils/scheduleAsMember';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
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

export default function ScheduleDetail() {
  const router = useRouter();
  const { uuid, date } = router.query;
  const { data: event } = useGetEventQuery(uuid as string);
  const { data: scheduleList } = useGetScheduleQuery(uuid as string);
  const startIndex = TIMETABLE.indexOf(event?.startTime || '00:00');
  const [availableMember, setAvailableMember] = useState({});
  useEffect(() => {
    if (scheduleList && event) {
      const detail = scheduleListToAvailableMember(scheduleList, event);
      setAvailableMember(detail);
    }
  }, [scheduleList, event]);

  return (
    <Layout className="h-screen bg-white absolute mx-auto max-w-[375px] inset-0 z-10">
      {date && (
        <Detail
          detail={availableMember[date as string]}
          date={date as string}
          startIdx={startIndex}
        />
      )}

    </Layout>
  );
}
