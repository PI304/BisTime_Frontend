import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';

function Schedule() {
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Complete! <br />
            Copy the Link and <br />
            Share with your Friends
          </h1>
        </div>
        <div className="grid grid-cols-4 w-full gap-4 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (day, index) => (
              <div
                key={index}
                className="w-18 hover:bg-primary-green-1 text-primary-green-3 hover:text-base-white cursor-pointer transition bg-secondary-orange-3 aspect-square px-4 py-2 flex flex-col items-center justify-center rounded-md"
              >
                <span className="block text-p4">Dec 18</span>
                <span className="block text-p1">0 / 0</span>
              </div>
            ),
          )}
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Button
            onClick={() => {
              router.push('/events/create/summary');
            }}
          >
            Share Link
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Schedule;
