import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import DashBoard from '@components/event/DashBoard';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useRouter } from 'next/router';

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
  const { data } = useGetEventQuery(uuid as string);

  console.log(data);
  return (
    <Layout>
      <Navigate link />
      <div className="w-full flex flex-col mt-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-24">주니 생일</div>
            <div className="flex flex-col ml-2 ju font-light text-gray-7 text-8">
              <p>1월 10일 오후 6:24</p>
              <p>12명 응답</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
          </div>
        </div>
        <div>
          <DashBoard />
        </div>
      </div>
    </Layout>
  );
}