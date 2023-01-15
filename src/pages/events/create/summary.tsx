import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useEffect, useState } from 'react';
import SummaryCalender from '@components/create/calender-summary';
import { useAppSelector } from '@features/hooks';
import useMutation from '@apis/useMutation';
import Loader from '@components/common/loader';
import Navigate from '@components/common/navigate';
interface EventMutaionResponse {
  id: number;
  uuid: string;
}

function Schedule() {
  const router = useRouter();
  const { uuid } = router.query;

  const [copyLoading, setCopyLoading] = useState(false);

  const eventState = useAppSelector((state) => state.event);
  const [createEventDate, { data: dates, loading: isLoader }] =
    useMutation<EventMutaionResponse>(`/api/events/${uuid}/dates`);

  useEffect(() => {
    if (eventState.additional_dates && uuid) {
      createEventDate({ additionalDates: eventState.additional_dates });
    }
  }, [eventState.additional_dates, uuid]);

  const handleShareLink = () => {
    setCopyLoading(true);
    setTimeout(() => {
      setCopyLoading(false);
    }, 200);

    const uid = uuid as string;
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/events/update?uuid=${uid}`,
    );
  };

  if (isLoader) return <Loader />;

  return (
    <Layout>
      <Navigate left="back" />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h1 className="text-h2 font-normal text-center text-base-black">
            Complete! <br />
            Copy the Link and <br />
            Share with your Friends
          </h1>
        </div>
        <SummaryCalender />
        <div className="w-full flex items-center justify-center mt-4">
          <Button loading={copyLoading} onClick={handleShareLink}>
            Share Link
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
