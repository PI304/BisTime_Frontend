import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';
import { useForm } from 'react-hook-form';
import { setTitle } from '@features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import Navigate from '@components/common/navigate';
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
      <Navigate />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-normal text-center text-base-black">
            Event's Name
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              name="title"
              placeholder="Enter event name"
              height="lg"
              register={register('title', {
                required: true,
                maxLength: 100,
                minLength: 1,
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                This field is required
              </p>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                Max length is 100
              </p>
            )}
          </div>

          <Button size="lg">Next</Button>
        </form>
      </div>
    </Layout>
  );
}
export default Create;
