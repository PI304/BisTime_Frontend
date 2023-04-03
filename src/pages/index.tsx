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
        <div className="w-full font-light flex flex-col items-center justify-center mb-4">
          <div className="mb-6 text-14 font-medium">
            모임 시간을 잡는 손쉬운 방법, "비즈타임"
          </div>
          <div className="text-11 text-left w-full space-y-3">
            <div>
              <span className="font-medium">📌 What? </span>
              <br />
              비즈타임은 여러명이 손쉽게 모임 시간을 정할 수 있도록 도와주는
              툴이에요.
            </div>
            <div>
              <span className="font-medium">📌 Who? </span>
              <br />
              모임 시간을 조정하기 귀찮은 사람들이라면 누구나 사용할 수 있어요
            </div>
            <div>
              <span className="font-medium">📌 When? </span> <br />
              친구들과 약속을 잡을 때, 학교에서 팀플 일정을 잡을 때, 팀원들의
              일정을 트래킹 해야 할때 등 타임 매니지먼트가 필요할 때라면 언제나
              사용할 수 있어요.
            </div>
            <div>
              <span className="font-medium">📌 Why? </span>
              <br />
              모바일 프렌들리한 UI 로 빠르고 쉽게 내 일정을 공유할 수 있어요.
            </div>
            <div>
              <span className="font-medium">📌 How? </span> <br />
              새로운 일정을 만들고, 모임의 시간 범위 (기본 시작 시간과 종료
              시간) 를 정한 뒤, 생성된 링크를 공유해보세요.
            </div>
            <div>
              🤭 커밍쑨! 팀 빌딩, 팀 매니지먼트를 위한 비즈타임 ‘팀모드’ 현재
              개발중이에요!
            </div>
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
