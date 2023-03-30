import { Button } from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate/Navigate';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { setTitle } from '@features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@features/hooks';

interface FeedbackForm {
  feedback: string;
}

function Feedback() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FeedbackForm>({
    defaultValues: {
      feedback: '',
    },
  });

  const onSubmit = (form: FeedbackForm) => {
    const { feedback } = form;
    if (feedback) router.push('/event/create/create02');
  };

  return (
    <Layout>
      <Navigate back />
      <div className="w-full flex flex-col mt-6">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-14 text-center w-full">
            BISTIME을 사용해주셔서 감사합니다!
            <br /> 사용하면서 불편한 점이 있었다면 알려주세요!
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <textarea
              placeholder="500자 이내로 작성하세요."
              className="scrollbar-thin scrollbar-thumb-primary-green-1 scrollbar-thumb-rounded-full scrollbar-track-transparent bg-secondary-orange-3 h-60 resize-none w-full text-12 font-medium  placeholder:text-primary-green-3 text-primary-green-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-primary-green-3 focus:border-transparent"
              {...register('feedback', { required: true })}
            />
          </div>
          <Button>보내기</Button>
        </form>
      </div>
    </Layout>
  );
}
export default Feedback;
