import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';

function Schedule() {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Choose WeekDays
          </h1>
        </div>
        <div className="w-full space-y-4 flex flex-col items-center justify-center">
          <Calender />
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
