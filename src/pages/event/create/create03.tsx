import useMutation from '@apis/useMutation';
import Button from '@components/common/Button';
import Calender from '@components/common/Calender';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import { useEffect } from 'react';
import { TimePicker } from '@components/common/TimePicker';

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
    useMutation<EventMutaionResponse>('/api/events');

  const onSubmit = (form: ScheuleForm) => {
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
      <Navigate back />
      <ProgressBar progress="1/2" className="mt-3" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 w-full space-y-5 flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">모임을 희망하는</div>
          <div className="text-18 text-left w-full">날짜를 선택하세요.</div>
          <div className="text-18 text-left w-full">
            여러 날의 선택이 가능합니다.
          </div>
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
