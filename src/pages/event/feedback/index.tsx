import feedbackApi from '@apis/feedback/feedbackApi';
import { Button } from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate/Navigate';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
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

  const onSubmit = async (form: FeedbackForm) => {
    const { feedback } = form;
    const data = await feedbackApi.postFeedback({ content: feedback });
    if (data) router.back();
  };

  return (
    <Layout>
      <Navigate back />
      <div className="w-full flex flex-col mt-6">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-14 text-center w-full">
            BISTIME을 사용해주셔서 감사합니다!
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <textarea
              placeholder="어떤 의견이든 남겨주세요."
              className="scrollbar-thin scrollbar-thumb-primary-green-1 scrollbar-thumb-rounded-full scrollbar-track-transparent bg-secondary-orange-3 h-60 resize-none w-full text-12 font-medium  placeholder:text-primary-green-3 text-primary-green-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-primary-green-3 focus:border-transparent"
              {...register('feedback', { required: true })}
            />
          </div>
          <Button>의견 보내기</Button>
        </form>
      </div>
    </Layout>
  );
}
export default Feedback;
