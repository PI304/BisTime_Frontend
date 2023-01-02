import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Calender from '@components/common/calender';

function Schedule() {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Complete! <br />
            Copy the Link and <br />
            Share with your Friends
          </h1>
        </div>
        <Calender isEditable={false} />
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            onClick={() => {
              router.push('/events/create/summary');
            }}
          >
            Share Link
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
