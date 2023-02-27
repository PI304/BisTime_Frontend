import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import DashBoard from '@components/schedule/DashBoard';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useGetScheduleQuery } from '@apis/schedule/scheduleApi.query';
import { useRouter } from 'next/router';
import { usePostScheduleMutation } from '@apis/schedule/scheduleApi.mutation';
import { useAppSelector } from '@features/hooks';

const scheduleListToMembers = (scheduleList: Schedule[]) => {
  const members = scheduleList.map((item) => item.name);
  const memberSet = new Set(members);
  const memberArray = Array.from(memberSet);
  return memberArray;
};
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

export default function Add() {
  const router = useRouter();
  const scheduleState = useAppSelector((state) => state.schedule);
  const { uuid } = router.query;
  const { data: event, isLoading } = useGetEventQuery(uuid as string);
  const { data: scheduleList } = useGetScheduleQuery(uuid as string);
  const members = scheduleListToMembers(scheduleList || []);
  const startIndex = TIMETABLE.indexOf(event?.startTime || '00:00');
  const endIndex = TIMETABLE.indexOf(event?.endTime || '00:00');

  const { mutate } = usePostScheduleMutation(uuid as string);

  return (
    <Layout className="relative">
      <Navigate back />
      <ProgressBar progress="w-full" className="mt-3" />
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">
            모임 시간을 설정하세요.
          </div>
          <div className="text-18 text-left w-full">30분 단위로 가능한</div>
          <div className="text-18 text-left w-full">시간대에 체크하세요.</div>
        </div>
        <div className="w-full">
          {Object.keys(event?.availability || {}).map((date) => (
            <DashBoard
              key={date}
              members={members}
              date={date}
              startIdx={startIndex}
              endIdx={endIndex}
              availability={event?.availability[date]}
            />
          ))}
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button
            loading={isLoading}
            onClick={() => {
              mutate(scheduleState);
            }}
            className="absolute bottom-4 w-[calc(100%-40px)]"
          >
            일정 등록 하기
          </Button>
        </div>
      </div>
    </Layout>
  );
}
