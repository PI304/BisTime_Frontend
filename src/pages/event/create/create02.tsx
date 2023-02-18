import Button from '@components/common/Button';
import Calender from '@components/common/Calender';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { TimePicker } from '@components/common/TimePicker';

type time = {
  value: string;
};

interface ScheuleForm {
  start_time: time;
  end_time: time;
}

function Schedule() {
  const { setValue, handleSubmit, setError } = useForm<ScheuleForm>();

  const onSubmit = (form: ScheuleForm) => {
    const { start_time, end_time } = form;
    if (start_time.value > end_time.value) {
      setError('end_time', {
        type: 'manual',
        message: '시작 시간이 종료 시간보다 늦을 수 없습니다.',
      });
      return;
    }
  };

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-1/2" className="mt-3" />
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
        <div className="w-full flex items-center justify-center mt-5">
          <Button>다음</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
