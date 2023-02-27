import Button from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate/Navigate';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setName } from '@features/schedule/scheduleSlice';

interface ScheduleForm {
  name: string;
}

export default function Add() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.schedule.name);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ScheduleForm>({
    defaultValues: {
      name: name,
    },
  });

  const { uuid } = router.query;

  const onSubmit = (form: ScheduleForm) => {
    const { name } = form;
    dispatch(setName(name));
    if (name)
      router.push({ pathname: 'event/schedule/add02', query: { uuid: uuid } });
  };

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-1/4" className="mt-3" />
      <div className="w-full flex flex-col mt-9">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">
            새로운 일정을 등록합니다.
          </div>
          <div className="text-18 text-left w-full">이름을 입력해주세요.</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-5 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              name="title"
              placeholder="50자 이내로 작성하세요."
              height="lg"
              register={register('name', {
                required: true,
                maxLength: 50,
                minLength: 1,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <ErrorMessage className="mt-2" message="이름을 입력해주세요." />
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <ErrorMessage message="50자 이내로 작성해주세요." />
            )}
          </div>
          <Button>다음</Button>
        </form>
      </div>
    </Layout>
  );
}
