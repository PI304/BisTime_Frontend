import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';
import Button from '@components/common/button';
import TimePicker from '@components/common/time-picker';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import useMutation from '@apis/useMutation';
import { useEffect } from 'react';

type time = {
  value: string;
};

interface ScheuleForm {
  start_time: time;
  end_time: time;
}

interface EventMutaionResponse {
  id: number;
  uuid: string;
}

function Schedule() {
  const { setValue, handleSubmit } = useForm<ScheuleForm>();
  const eventState = useAppSelector((state) => state.event);
  const router = useRouter();

  const [createEvent, { data, loading }] =
    useMutation<EventMutaionResponse>('/api/events/');

  const onValid = (form: ScheuleForm) => {
    const { start_time, end_time } = form;
    if (start_time.value > end_time.value) {
      alert(
        'Please check the time you entered. The start time must be earlier than the end time.',
      );
      return;
    }
    createEvent({
      title: eventState.title,
      startTime: start_time.value,
      endTime: end_time.value,
    });
  };

  useEffect(() => {
    if (data) {
      router.push({
        pathname: '/events/create/summary',
        query: { uuid: data.uuid },
      });
    }
  }, [data, router]);

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Choose WeekDays
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <Calender />
        </div>
        <div className="w-full flex items-center justify-between mt-4">
          <TimePicker
            name="start_time"
            dayOrNight={false}
            setValue={setValue}
          />
          <TimePicker name="end_time" dayOrNight={true} setValue={setValue} />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button loading={loading}>Next</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
