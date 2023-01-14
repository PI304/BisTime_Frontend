import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { useEffect, useState } from 'react';
import ScheduleCalender from '@components/update/calender-schedule';
import { setAvailability as setScheduleAvailability } from '@features/schedule/scheduleSlice';
import useSWR from 'swr';
import useMutation from '@apis/useMutation';
import { Event } from 'types/event';
import Modal from '@components/common/modal';

const TIMEZONE = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

type EventScheduleResult = {
  name: string;
  date: string;
  availability: string;
};
interface EventScheduleResponse {
  results: EventScheduleResult[];
}

interface PossibleMembersArray {
  date: PossibleMembers;
}

type PossibleMembers = {
  '00:00': string[];
  '00:30': string[];
  '01:00': string[];
  '01:30': string[];
  '02:00': string[];
  '02:30': string[];
  '03:00': string[];
  '03:30': string[];
  '04:00': string[];
  '04:30': string[];
  '05:00': string[];
  '05:30': string[];
  '06:00': string[];
  '06:30': string[];
  '07:00': string[];
  '07:30': string[];
  '08:00': string[];
  '08:30': string[];
  '09:00': string[];
  '09:30': string[];
  '10:00': string[];
  '10:30': string[];
  '11:00': string[];
  '11:30': string[];
  '12:00': string[];
  '12:30': string[];
  '13:00': string[];
  '13:30': string[];
  '14:00': string[];
  '14:30': string[];
  '15:00': string[];
  '15:30': string[];
  '16:00': string[];
  '16:30': string[];
  '17:00': string[];
  '17:30': string[];
  '18:00': string[];
  '18:30': string[];
  '19:00': string[];
  '19:30': string[];
  '20:00': string[];
  '20:30': string[];
  '21:00': string[];
  '21:30': string[];
  '22:00': string[];
  '22:30': string[];
  '23:00': string[];
  '23:30': string[];
};

function Schedule() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { data, isLoading } = useSWR<Event>(`/api/events/${router.query.uuid}`);
  const { data: schedules, isLoading: schedulesLoading } =
    useSWR<EventScheduleResponse>(`/api/events/${router.query.uuid}/schedules`);
  const [updateSchedule, { data: updateData, loading }] = useMutation(
    `/api/events/${router.query.uuid}/schedules`,
  );

  const [event, setEvent] = useState<Event>();
  const [timeTable, setTimeTable] = useState([]);
  const [members, setMembers] = useState<Set<string>>(new Set());
  const [possibleMembers, setPossibleMembers] =
    useState<PossibleMembersArray>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleState = useAppSelector((state) => state.schedule);

  console.log(scheduleState, schedules);

  useEffect(() => {
    if (schedulesLoading) return;
    if (!schedules) return;
    if (schedules.results.length === 0) return;
    const newMembers = new Set<string>();
    const { results } = schedules;
    results.forEach((result) => {
      newMembers.add(result.name);
    });
    setMembers(newMembers); // 이벤트에 참여한 멤버들
    // const newPossibleMembers = possibleMembers;
    // results.forEach((result) => {
    //   const { date, availability } = result;
    //   [...availability].forEach((time, index) => {
    //     if (time === '1') {
    //       if (!newPossibleMembers[date]) {
    //         newPossibleMembers[date] = {};
    //       }
    //       if (!newPossibleMembers[date][TIMEZONE[index]]) {
    //         newPossibleMembers[date][TIMEZONE[index]] = [];
    //       }
    //       newPossibleMembers[date][TIMEZONE[index]].push(result.name);
    //     }
    //   });
    // });
    // setPossibleMembers(newPossibleMembers); // 해당 시간대에 가능한 멤버들
  }, [schedules, schedulesLoading, possibleMembers]);

  useEffect(() => {
    if (isLoading) return;
    setEvent(data);
  }, [data, isLoading]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLoading) return;
    if (!event) return;
    const startIndex = TIMEZONE.indexOf(event.start_time);
    const endIndex = TIMEZONE.indexOf(event.end_time);
    const timeRange = TIMEZONE.slice(startIndex, endIndex + 1);
    setTimeTable(timeRange);
  }, [event, isLoading]);

  const onTimeTableClick = (time: string) => {
    const index = TIMEZONE.indexOf(time);
    const availability = scheduleState.availability[scheduleState.current];
    const newAvailability =
      availability.slice(0, index) +
      (availability[index] === '0' ? '1' : '0') +
      availability.slice(index + 1);
    dispatch(
      setScheduleAvailability({
        date: scheduleState.current,
        availability: newAvailability,
      }),
    );
  };

  const onValid = () => {
    const name = scheduleState.name;
    const availability = Object.values(scheduleState.availability);
    updateSchedule({
      name,
      availability,
    });

    setIsModalOpen(true);
  };

  console.log(updateData);

  // 스케줄 이름이 없거나, 스케줄이 없으면 이전페이지로 이동
  const { uuid } = router.query;
  useEffect(() => {
    if (!uuid) return;
    if (
      scheduleState.name === '' ||
      Object.keys(scheduleState.availability).length === 0
    ) {
      router.push(`/events/update?uuid=${uuid}`);
    }
  }, [scheduleState.name, router, scheduleState.availability, uuid]);

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full flex flex-col items-center justify-center h-full"
      >
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-4xl font-bold text-center text-primary-green-1">
            {event && event.title ? event.title : 'Event Title'}
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ScheduleCalender />
        </div>
        {scheduleState.current !== '' && (
          <div className="flex flex-col w-full space-y-2 mt-2 h-[368px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-green-1 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            {timeTable?.map((time, index) => (
              <div
                key={index}
                onClick={() => {
                  onTimeTableClick(time);
                }}
                className="flex justify-between"
              >
                <div className="h-14 flex text-primary-green-3 ml-1">
                  {time}
                </div>
                <div
                  className={`w-4/5 rounded-lg h-14 mr-2 flex items-end justify-between ${
                    scheduleState?.availability[scheduleState.current][
                      TIMEZONE.indexOf(time)
                    ] === '1'
                      ? 'bg-primary-green-1'
                      : 'bg-secondary-orange-3'
                  }`}
                >
                  {/* <div className="flex mb-1 ml-1 space-x-1 mr-3 items-center">
                    {possibleMembers &&
                      possibleMembers[scheduleState.current] &&
                      possibleMembers[scheduleState.current][time] &&
                      possibleMembers[scheduleState.current][time].map(
                        (member, index) => (
                          <div
                            key={index}
                            className={`w-5 h-5 text-p5 rounded-full ${
                              scheduleState.availability[scheduleState.current][
                                TIMEZONE.indexOf(time)
                              ] === '1'
                                ? 'bg-base-white'
                                : 'hidden'
                            }`}
                          >
                            {member}
                          </div>
                        ),
                      )}
                  </div> */}
                  {/* <span
                    className={`text-h3 mr-2 mb-1 ${
                      scheduleState.availability[scheduleState.current][
                        TIMEZONE.indexOf(time)
                      ] === '1'
                        ? 'text-base-white'
                        : 'text-secondary-orange-3'
                    }`}
                  >
                    {+event.availability[scheduleState.current][
                      TIMEZONE.indexOf(time)
                    ] +
                      1 +
                      ' / ' +
                      members.size}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <Button loading={loading}>Submit</Button>
        </div>
      </form>
      <Modal
        isModal={isModalOpen}
        onAccept={() => console.log('accept')}
        onCloseModal={() => router.push(`/events/update?uuid=${uuid}`)}
      />
    </Layout>
  );
}
export default Schedule;
