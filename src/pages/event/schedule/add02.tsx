import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ProgressBar from '@components/common/ProgressBar';
import { useRouter } from 'next/router';
import Calender from '@components/event/Calender';

export default function Add() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate back />
      <ProgressBar progress="w-2/3" className="mt-3" />
      <div className="mt-6 w-full space-y-5 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-18 text-left w-full">날짜를 확인하고</div>
          <div className="text-18 text-left w-full">일정을 등록해주세요.</div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Calender />
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button
            onClick={() =>
              router.push({
                pathname: '/event/schedule/add03',
                query: { uuid: router.query.uuid },
              })
            }
          >
            다음
          </Button>
        </div>
      </div>
    </Layout>
  );
}
