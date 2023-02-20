import Navigate from '@components/common/Navigate';
import Layout from '@components/common/Layout';

export default function Event() {
  return (
    <Layout>
      <Navigate back link />
      <div className="w-full flex flex-col pt-2">
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
        <div className="mt-4">
          <div className="text-12">2023년 1월 14일 (토)</div>
          <div className="grid grid-cols-6 grid-rows-1">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index}>
                <p className="text-left font-light text-12 mt-2">18</p>
                <div
                  className={`w-full aspect-square mt-1 bg-primary-green-1 bg-opa bg-opacity-${
                    Math.floor(Math.random() * 20) * 5 + 5
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-12">2023년 1월 14일 (토)</div>
          <div className="grid grid-cols-6 grid-rows-1">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index}>
                <p className="text-left font-light text-12 mt-2">18</p>
                <div
                  className={`w-full aspect-square mt-1 bg-primary-green-1 bg-opa bg-opacity-${
                    Math.floor(Math.random() * 20) * 5 + 5
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-12">2023년 1월 14일 (토)</div>
          <div className="grid grid-cols-6 grid-rows-1">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index}>
                <p className="text-left font-light text-12 mt-2">18</p>
                <div
                  className={`w-full aspect-square mt-1 bg-primary-green-1 bg-opa bg-opacity-${
                    Math.floor(Math.random() * 20) * 5 + 5
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-12">2023년 1월 14일 (토)</div>
          <div className="grid grid-cols-6 grid-rows-1">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index}>
                <p className="text-left font-light text-12 mt-2">18</p>
                <div
                  className={`w-full aspect-square mt-1 bg-primary-green-1 bg-opa bg-opacity-${
                    Math.floor(Math.random() * 20) * 5 + 5
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
