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

function Schedule() {
  const router = useRouter();
  const { uuid } = router.query;

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
    setCopyLoading(true);
    setTimeout(() => {
      setCopyLoading(false);
    }, 200);

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
      <div className="mt-9 w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">
            이벤트 링크가 생성되었습니다.
          </div>
          <div className="text-18 text-left w-full">가장 먼저 자신의</div>
          <div className="text-18 text-left w-full">일정을 등록하고,</div>
          <div className="text-18 text-left w-full">
            친구들에게 링크를 공유하세요.
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
    </Layout>
  );
}
export default Schedule;
