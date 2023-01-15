import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import Navigate from '@components/common/navigate';
import Date from '@components/update/date';
import RankMarker from '@components/update/rank-marger';
import { useState } from 'react';

function Schedule() {
  const router = useRouter();
  const eventState = useAppSelector((state) => state.event);
  const scheduleState = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  const { uuid } = router.query;

  console.log('eventState', eventState);
  console.log('scheduleState', scheduleState);
  const DAYS = Object.keys(scheduleState.availability);
  const [currentDay, setCurrentDay] = useState(DAYS[0]);
  console.log(DAYS);

  return (
    <Layout>
      <Navigate
        left="back"
        center="title"
        title={eventState.title}
        right="user"
        user={scheduleState.name}
      />
      <div className="w-full flex flex-col items-center justify-start h-full">
        <div className="w-full flex justify-between mt-4">
          <Date />
          <RankMarker />
        </div>
        <div className="space-y-2 w-full relative">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className="w-full flex h-14">
              <div className="flex-col h-full justify-between items-center">
                <div className="text-[14px] font-medium w-full h-1/2  flex justify-center items-center">
                  16:00
                </div>
                <div className="text-[12px] font-light w-full h-1/2 flex justify-center items-center">
                  7 / 8
                </div>
              </div>
              <div className="bg-primary-green-2 ml-6 rounded-xl h-full w-full" />
            </div>
          ))}
          <div className="bg-gray-4 w-[1px] h-full absolute rounded-full bottom-0 left-12" />
        </div>

        {currentDay === DAYS[0] && (
          <div className="w-full flex items-center justify-center mt-4">
            <Button
              onClick={() => {
                setCurrentDay(DAYS[DAYS.indexOf(currentDay) + 1]);
              }}
            >
              Next
            </Button>
          </div>
        )}
        {currentDay !== DAYS[0] && currentDay !== DAYS[DAYS.length - 1] && (
          <div className="flex w-full justify-between">
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDay(DAYS[DAYS.indexOf(currentDay) - 1]);
                }}
              >
                Before
              </Button>
            </div>
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDay(DAYS[DAYS.indexOf(currentDay) + 1]);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {currentDay === DAYS[DAYS.length - 1] && (
          <div className="flex w-full justify-between">
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDay(DAYS[DAYS.indexOf(currentDay) - 1]);
                }}
              >
                Before
              </Button>
            </div>
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  alert('end');
                }}
              >
                End
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default Schedule;
