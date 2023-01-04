import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Calender from '@components/common/calender';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@features/hooks';
import { useEffect, useState } from 'react';

const MOCKTIMETABE = ['16:00', '17:00', '18:00', '19.00'];

function Schedule() {
  const { setValue, handleSubmit } = useForm();
  const router = useRouter();
  const eventState = useAppSelector((state) => state.event);
  const scheduleState = useAppSelector((state) => state.schedule);

  const [timeTable, setTimeTable] = useState(MOCKTIMETABE);
  const [isPossibleArray, setIsPossibleArray] = useState<boolean[]>([]);

  useEffect(() => {
    const timeTable = MOCKTIMETABE.map((time) => {
      return false;
    });
    setIsPossibleArray(timeTable);
  }, []);

  const onTimeTableClick = (time: string) => {
    console.log(time);
    setValue(scheduleState.current, time);
    setIsPossibleArray(
      isPossibleArray.map((isPossible, index) => {
        if (time === MOCKTIMETABE[index]) {
          return !isPossible;
        }
        return isPossible;
      }),
    );
  };

  const onValid = (form) => {
    router.push('/events/create/summary');
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex items-center justify-center">
          <Calender isEditable={false} />
        </div>
        {scheduleState.current !== '' && (
          <div className="flex flex-col w-full space-y-2 mt-2 h-[368px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-green-1 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {timeTable.map((time, index) => (
              <div
                key={index}
                onClick={() => {
                  onTimeTableClick(time);
                }}
                className="flex justify-between"
              >
                <div className="h-28 flex text-primary-green-3 ml-1">
                  {time}
                </div>
                <div
                  className={`w-4/5 rounded-lg h-28 mr-2 ${
                    isPossibleArray[index]
                      ? 'bg-primary-green-1'
                      : 'bg-secondary-orange-3'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <Button>Submit</Button>
        </div>
      </form>
    </Layout>
  );
}
export default Schedule;
