import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Navigate from '@components/common/navigate';

function Home() {
  const router = useRouter();
  return (
    <Layout>
      <Navigate />
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-normal text-center text-base-black">
            Create Your Own Plan <br />
            And Share with teams
          </h1>
        </div>
        <div className="w-full space-y-4 flex flex-col items-center justify-center">
          <Button size="lg" onClick={() => router.push('/events/create')}>
            Events
          </Button>
          <h1 className="text-b2 font-bold text-center text-base-black">OR</h1>
          <Button size="lg" onClick={() => router.push('/events/create')}>
            Teams
          </Button>
        </div>
      </div>
    </Layout>
  );
}
export default Home;
