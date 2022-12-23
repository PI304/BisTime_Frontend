import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';

function Create() {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Event's Name
          </h1>
        </div>
        <div className="w-full space-y-4 flex flex-col items-center justify-center">
          <Input name="event_name" placeholder="Enter event name" height="lg" />
          <Button
            size="lg"
            onClick={() => router.push('/events/create/schedule')}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Create;
