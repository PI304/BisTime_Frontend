import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';
import { useForm } from 'react-hook-form';
import { setTitle } from '@features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import Navigate from '@components/common/navigate';
import ProgressBar from '@components/common/progress-bar';
interface EventForm {
  title: string;
}

function Create() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const titleState = useAppSelector((state) => state.event.title);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EventForm>({
    defaultValues: {
      title: titleState,
    },
  });

  const onSubmit = (form: EventForm) => {
    const { title } = form;
    dispatch(setTitle(title));
    if (title) router.push('/events/create/schedule');
  };

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="1/3" className="mt-3" />
      <div className="w-full flex flex-col mt-9">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">친구들과 공유할</div>
          <div className="text-18 text-left w-full">모임의 이름을</div>
          <div className="text-18 text-left w-full">정해주세요.</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-9 w-full space-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              name="title"
              placeholder="50자 이내로 작성하세요."
              height="lg"
              register={register('title', {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                모임의 이름을 정해주세요.
              </p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                최대 50자까지 입력 가능합니다.
              </p>
            )}
          </div>
          <Button>다음</Button>
        </form>
      </div>
    </Layout>
  );
}
export default Create;
