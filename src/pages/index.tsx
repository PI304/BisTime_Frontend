import { Button } from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  return (
    <Layout className="h-screen">
      <Navigate />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-4">
          <div className="text-14 text-left w-full">
            <span className="font-bold">BISTIME</span>은 시간 관리를 위한 간단한
            도구 입니다.
          </div>
          <div className="text-14 w-full mt-2">
            모임을 만들고, 모임에 참여하고, 모임의 일정을 관리해보세요.
          </div>
        </div>
        <div className="w-full mt-4 space-y-2 flex flex-col items-center justify-center">
          <Button onClick={() => router.push('/event/create/create01')}>
            모임 만들러 가기
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Home;
