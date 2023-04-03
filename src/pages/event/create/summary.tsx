import { Button } from '@components/common/Button';
import Layout from '@components/common/Layout/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import Calender from '@components/event/Calender';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@features/hooks';
import { usePostEventDateMutation } from '@apis/event/eventApi.mutation';
import Toast from '@components/common/Toast';

function Schedule() {
  const router = useRouter();
  const { uuid } = router.query;
  const [toast, setToast] = useState(false);

  const [copyLoading, setCopyLoading] = useState(false);

  const eventState = useAppSelector((state) => state.event);

  const { mutate, isLoading } = usePostEventDateMutation(uuid as string);

  useEffect(() => {
    if (eventState.additionalDates && uuid) {
      mutate({
        additionalDates: eventState.additionalDates,
      });
    }
  }, [eventState.additionalDates, uuid]);

  const handleShareLink = () => {
    setToast(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/event?uuid=${uuid}`,
    );
  };

  const handleSchedule = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}/event?uuid=${uuid}`,
      '_blank',
    );
  };

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-full" className="mt-3" />
      <div className="mt-6 w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">모임을 만들었어요!</div>
          <div className="text-18 text-left w-full">
            자신의 일정을 등록하거나,
          </div>
          <div className="text-18 text-left w-full"></div>
          <div className="text-18 text-left w-full">
            모임원에게 링크를 공유해보세요.
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Calender />
        </div>
        <div className="w-full flex-col space-y-3 items-center justify-center mt-4">
          <Button className="font-medium" onClick={handleSchedule}>
            내 일정 등록하기
          </Button>
          <Button loading={copyLoading} onClick={handleShareLink}>
            링크 복사하기
          </Button>
        </div>
      </div>
      {toast && <Toast setToast={setToast} text="링크가 복사되었습니다." />}
    </Layout>
  );
}
export default Schedule;
