import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Calender from '@components/common/calender';
import { useState } from 'react';

function Schedule() {
  const router = useRouter();

  const { uuid } = router.query;
  const [loading, setLoading] = useState(false);

  const handleShareLink = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
    const uid = uuid as string;
    navigator.clipboard.writeText(`localhost:3000/events/update?uuid=${uid}`);
  };

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
          <Button loading={loading} onClick={handleShareLink}>
            Share Link
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
