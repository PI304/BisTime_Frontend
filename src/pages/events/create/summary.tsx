import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useState } from 'react';
import SummaryCalender from '@components/create/calender-summary';

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
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/events/update?uuid=${uid}`,
    );
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
        <SummaryCalender />
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
