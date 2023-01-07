import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@features/hooks';
import { setName, setAvailability } from '@features/schedule/scheduleSlice';
import useSWR from 'swr';
import { eventState } from '@features/event/eventSlice';
interface UserForm {
  name: string;
}

function Update() {
  const router = useRouter();
  const { uuid } = router.query;
  const { data, isLoading } = useSWR<eventState>(`/api/events/${uuid}}/`);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserForm>({});

  const onSubmit = (form: UserForm) => {
    if (isLoading || !data) return;

    const { name } = form;
    dispatch(setName(name));

    // 이미 있는 유저인지 확인하고 다른 path로 보내야함

    // 새로운 유저인 경우
    Object.keys(data.availability).forEach((key) => {
      dispatch(
        setAvailability({
          date: key,
          availability: '000000000000000000000000000000000000000000000000',
        }),
      );
    });

    router.push({
      pathname: '/events/update/schedule',
      query: { uuid },
    });
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h1 className="text-display font-bold text-center text-primary-green-1">
            {data ? `${data.title}` : 'Event Title'}
          </h1>
        </div>
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Who are you?
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              islabel
              label="Name"
              name="name"
              placeholder="Enter your name"
              height="lg"
              register={register('name', {
                required: true,
                maxLength: 100,
                minLength: 1,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                This field is required
              </p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                Max length is 100
              </p>
            )}
          </div>
          <Button size="lg" className="mt-4">
            Next
          </Button>
        </form>
      </div>
    </Layout>
  );
}
export default Update;
