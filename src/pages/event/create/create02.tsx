import Button from '@components/common/Button';
import Calender from '@components/common/Calender';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useAppSelector } from '@features/hooks';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import ErrorMessage from '@components/common/ErrorMessage';
import { useEffect } from 'react';

function Create() {
  const {
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  const router = useRouter();
  const eventState = useAppSelector((state) => state.event);
  console.log(eventState.additional_dates);
  const onSubmit = () => {
    const today = moment();

    let isDateValid = true;

    eventState.additional_dates.map((date) => {
      const someDate = moment(date);
      if (someDate.diff(today) <= 0) {
        isDateValid = false;
      }
    });

    if (!isDateValid) {
      setError('date', {
        type: 'manual',
        message: '오늘 이전의 날짜는 선택할 수 없습니다.',
      });
      return;
    } else router.push('/event/create/create03');
  };

  useEffect(() => {
    clearErrors('date');
  }, [eventState.additional_dates, clearErrors]);

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
          {errors.date && (
            <ErrorMessage
              className="mt-0"
              message={errors.date.message as string}
            />
          )}
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
export default Create;
