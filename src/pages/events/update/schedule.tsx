import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';

function Schedule() {
  const { setValue, handleSubmit } = useForm();
  const router = useRouter();
  const eventState = useAppSelector((state) => state.event);
  const scheduleState = useAppSelector((state) => state.schedule);
  console.log(eventState.additional_dates);
  console.log(scheduleState);

  const onValid = (form) => {
    router.push('/events/create/summary');
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex items-center justify-center">
          <Calender isEditable={false} />
        </div>
        <div className="flex flex-col w-full space-y-2 mt-2 h-[184px] overflow-y-auto">
          <div className="flex justify-between">
            <div className="h-14 flex text-primary-green-3 ml-1">16:00</div>
            <div className="w-4/5 rounded-lg bg-secondary-orange-3 h-14 mr-2"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-14 flex text-primary-green-3 ml-1">17:00</div>
            <div className="w-4/5 rounded-lg bg-secondary-orange-3 h-14 mr-2"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-14 flex text-primary-green-3 ml-1">18:00</div>
            <div className="w-4/5 rounded-lg bg-secondary-orange-3 h-14 mr-2"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-14 flex text-primary-green-3 ml-1">18:00</div>
            <div className="w-4/5 rounded-lg bg-secondary-orange-3 h-14 mr-2"></div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button>Submit</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
