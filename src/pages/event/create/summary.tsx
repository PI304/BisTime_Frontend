import { useRouter } from 'next/router';
import Layout from '@components/common/Layout/Layout';
import Button from '@components/common/Button';
import { useEffect, useState } from 'react';
import SummaryCalender from '@components/event/calender-summary';
import { useAppSelector } from '@features/hooks';
import useMutation from '@apis/useMutation';
import Loader from '@components/common/Loader/Loader';
import Navigate from '@components/common/Navigate/Navigate';
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

  const handleSchedule = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}/events/update?uuid=${uuid}`,
      '_blank',
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
        <div className="w-full flex-col space-y-3 items-center justify-center mt-4">
          <Button
            className="font-medium"
            loading={copyLoading}
            onClick={handleShareLink}
          >
            Share Link
          </Button>
          <Button className="font-medium" onClick={handleSchedule}>
            Update Your Schedule First
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
