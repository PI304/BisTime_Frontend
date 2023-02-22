import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import DashBoard from '@components/event/Calender/DashBoard';

export default function Event() {
  return (
    <Layout>
      <Navigate link />
      <div className="w-full flex flex-col mt-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-24">주니 생일</div>
            <div className="flex flex-col ml-2 ju font-light text-gray-7 text-8">
              <p>1월 10일 오후 6:24</p>
              <p>12명 응답</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
            <div className="w-1 aspect-square rounded-full bg-gray-5" />
          </div>
        </div>
        <div>
          <DashBoard />
        </div>
      </div>
    </Layout>
  );
}
