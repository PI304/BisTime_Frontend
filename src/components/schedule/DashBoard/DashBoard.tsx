import Loader from '@components/common/Loader';
import Image from 'next/image';
import { useGetEventQuery } from '@apis/event/eventApi.query';
import { useAppDispatch, useAppSelector } from '@features/hooks';
import { setAvailability } from '@features/schedule/scheduleSlice';
import { formatDateWithDayOfWeek } from '@utils/formatDate';
import { useRouter } from 'next/router';

interface DashBoardProps {
  date: string;
  members: string[];
  startIdx: number;
  endIdx: number;
  availability: string;
}

const TIMETABLE = [
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

function getOpacity(n, x) {
  if (x === 0) {
    return 10;
  }
  const result = Math.round((x / n) * 10) * 10;
  return Math.max(10, Math.min(100, result));
}

export default function DashBoard({
  date,
  members,
  startIdx,
  endIdx,
  availability,
}: DashBoardProps) {
  const dispatch = useAppDispatch();

  const scheduleState = useAppSelector((state) => state.schedule);

  const router = useRouter();
  const { data: event, isLoading } = useGetEventQuery(
    router.query.uuid as string,
  );

  const handleClick = (index: number) => {
    if (!event) return;
    const key = Object.keys(event.availability).indexOf(date);
    const newAvailabilityArray: string[] = [];
    for (let i = 0; i < scheduleState.availability[key].length; i++) {
      if (i === index) {
        if (scheduleState.availability[key][i] === '1')
          newAvailabilityArray.push('0');
        else newAvailabilityArray.push('1');
      } else {
        newAvailabilityArray.push(scheduleState.availability[key][i]);
      }
    }
    const newAvailability = [...scheduleState.availability];
    newAvailability[key] = newAvailabilityArray;
    dispatch(setAvailability(newAvailability));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <div className="text-12">{formatDateWithDayOfWeek(date)}</div>
        <Image
          onClick={() =>
            router.push({
              pathname: '/event/schedule/detail',
              query: { date, uuid: router.query.uuid },
            })
          }
          src="/svg/icons/caret_right.svg"
          width={24}
          height={24}
          className="cursor-pointer"
          alt="down"
        />
      </div>
      <div className="grid mt-1 grid-cols-6 gap-y-1 grid-rows-1">
        {event &&
          event.availability &&
          scheduleState.availability &&
          members &&
          scheduleState.availability[
            Object.keys(event.availability).indexOf(date)
          ] &&
          availability
            ?.slice(startIdx, endIdx)
            .split('')
            .map((availalbe, index) => {
              const time =
                (startIdx + index) % 2 === 0 ? TIMETABLE[startIdx + index] : '';
              return (
                <div key={index} onClick={() => handleClick(startIdx + index)}>
                  {time !== '' ? (
                    <p className={`text-left font-light text-10 h-4 `}>
                      {time}
                    </p>
                  ) : (
                    <Image
                      src="/svg/icons/triangle.svg"
                      width={8}
                      height={8}
                      alt="triangle"
                      className="h-4 -translate-x-1 "
                    />
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) <= 10 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-10">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                      {/* <p className="w-full absolute z-100 text-12 text-primary-green-3 aspect-square flex justify-center items-center opacity-0 transition hover:opacity-100">
                        {availalbe + '/' + members.length}
                      </p> */}
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 20 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-20">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 30 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-30">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 40 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-40">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 50 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-50">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 60 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-60">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 70 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-70">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 80 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-80">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 90 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-90">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {getOpacity(members.length, parseInt(availalbe)) === 100 && (
                    <div className="w-full flex justify-center items-center cursor-pointer relative aspect-square bg-primary-green-1 bg-opacity-100">
                      <div className="w-4/5 relative aspect-square">
                        {scheduleState.availability[
                          Object.keys(event.availability).indexOf(date)
                        ][startIdx + index] === '0' ? (
                          <Image
                            className="object-cover"
                            src="/svg/icons/unchecked.svg"
                            fill
                            alt="checked"
                          />
                        ) : (
                          <Image
                            className="object-cover"
                            src="/svg/icons/checked.svg"
                            fill
                            alt="checked"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
