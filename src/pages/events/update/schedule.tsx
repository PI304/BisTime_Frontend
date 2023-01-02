import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';

function Schedule() {
  const { setValue, handleSubmit } = useForm();
  const router = useRouter();

  const onValid = (form) => {
    router.push('/events/create/summary');
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex items-center justify-center">
          <Calender isEditable={false} />
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button>Next</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
