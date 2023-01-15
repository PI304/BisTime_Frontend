import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import Navigate from '@components/common/navigate';
import Date from '@components/update/date';
import RankMarker from '@components/update/rank-marger';
import { useEffect, useState } from 'react';
import { TIMEZONE } from '@utils/calender';

function Schedule() {
  const router = useRouter();
  const eventState = useAppSelector((state) => state.event);
  const scheduleState = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();
  const { uuid } = router.query;

  console.log('eventState', eventState);
  console.log('scheduleState', scheduleState);

  useEffect(() => {
    if (!uuid) return;
    if (
      scheduleState.name === '' ||
      Object.keys(scheduleState.availability).length === 0
    ) {
      router.push(`/events/update?uuid=${uuid}`);
    }
  }, [scheduleState.name, router, scheduleState.availability, uuid]);

  const DAYS = Object.keys(scheduleState.availability);
  const [currentDate, setCurrentDate] = useState(DAYS[0]);

  if (!eventState.title) return null;
  if (!scheduleState.name) return null;

  const availability = eventState.availability[currentDate];
  const start_time_index = TIMEZONE.indexOf(eventState.start_time);
  const end_time_index = TIMEZONE.indexOf(eventState.end_time);

  const timeRange = TIMEZONE.slice(start_time_index, end_time_index + 1);
  const possiblity = availability.slice(start_time_index, end_time_index + 1);

  console.log(timeRange, possiblity);

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
          <Date className="-mt-2" date={currentDate} />
          <RankMarker date={currentDate} />
        </div>
        <div className="mt-4 space-y-2 w-full relative">
          {timeRange.map((time, index) => (
            <div key={index} className="w-full flex h-14">
              <div className="flex-col h-full justify-between items-center">
                <div className="text-[14px] font-medium w-full h-1/2  flex justify-center items-center">
                  {time}
                </div>
                <div className="text-[12px] font-light w-full h-1/2 flex justify-center items-center">
                  {possiblity[index] + ' / ' + eventState.members.length}
                </div>
              </div>
              <div className="bg-primary-green-2 ml-6 rounded-xl h-full w-full" />
            </div>
          ))}
          <div className="bg-gray-4 w-[1px] h-full absolute rounded-full bottom-0 left-12" />
        </div>

        {currentDate === DAYS[0] && (
          <div className="w-full flex items-center justify-center mt-4">
            <Button
              onClick={() => {
                setCurrentDate(DAYS[DAYS.indexOf(currentDate) + 1]);
              }}
            >
              Next
            </Button>
          </div>
        )}
        {currentDate !== DAYS[0] && currentDate !== DAYS[DAYS.length - 1] && (
          <div className="flex w-full justify-between">
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDate(DAYS[DAYS.indexOf(currentDate) - 1]);
                }}
              >
                Before
              </Button>
            </div>
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDate(DAYS[DAYS.indexOf(currentDate) + 1]);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {currentDate === DAYS[DAYS.length - 1] && (
          <div className="flex w-full justify-between">
            <div className="w-[calc(50%-4px)] flex items-center justify-center mt-4">
              <Button
                onClick={() => {
                  setCurrentDate(DAYS[DAYS.indexOf(currentDate) - 1]);
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
