import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';
import { useForm } from 'react-hook-form';
interface EventForm {
  title: string;
}

function Create() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<EventForm>();

  const onSubmit = (data: EventForm) => {
    console.log(data);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Event's Name
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 flex flex-col items-center justify-center"
        >
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

          <Button
            size="lg"
            // onClick={() => router.push('/events/create/schedule')}
          >
            Next
          </Button>
        </form>
      </div>
    </Layout>
  );
}
export default Create;
