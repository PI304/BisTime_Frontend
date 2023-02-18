import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import { useEffect } from 'react';
import { TimePicker } from '@components/common/TimePicker';
import ErrorMessage from '@components/common/ErrorMessage';
import { usePostEventMutation } from '@apis/event/eventApi.mutation';

type time = {
  value: string;
};

interface ScheuleForm {
  start_time: time;
  end_time: time;
}

function Create() {
  const {
    setValue,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ScheuleForm>();
  const eventState = useAppSelector((state) => state.event);

  const { mutate, isLoading } = usePostEventMutation();
  const onSubmit = (form: ScheuleForm) => {
    const { start_time, end_time } = form;
    if (start_time.value > end_time.value) {
      setError('start_time', {
        type: 'manual',
        message: '시작시간이 종료시간보다 늦을 수 없습니다.',
      });
      return;
    }
    mutate({
      title: eventState.title,
      startTime: start_time.value,
      endTime: end_time.value,
    });
  };
  useEffect(
    () => clearErrors(),
    [clearErrors, watch('start_time'), watch('end_time')],
  );

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-3/4" className="mt-3" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-9 w-full space-y-5 flex flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">
            모임 시간을 설정하세요.
          </div>
          <div className="text-18 text-left w-full">30분 단위로</div>
          <div className="text-18 text-left w-full">가능여부를 조사합니다.</div>
          {errors.start_time && (
            <ErrorMessage message={errors.start_time.message} />
          )}
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <TimePicker
            name="start_time"
            label="시작시간"
            dayOrNight={false}
            setValue={setValue}
          />
          <TimePicker
            name="end_time"
            label="종료시간"
            dayOrNight={true}
            setValue={setValue}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button loading={isLoading}>이벤트 만들기</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Create;
