import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';
import Select from '@components/common/select';
import Toggle from '@components/common/toggle';
import Button from '@components/common/button';

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
        <div className="w-full flex items-center justify-center">
          <Calender />
        </div>
        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex justify-center items-center">
            <Select />
            <Toggle className="ml-1" />
          </div>
          <div className="flex justify-center items-center">
            <Select />
            <Toggle className="ml-1" />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            onClick={() => {
              router.push('/events/create/summary');
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
