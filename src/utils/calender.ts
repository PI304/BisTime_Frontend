const formatDay = (day: number) => (day < 10 ? '0' + day + '' : day + '');

const formatMonth = (month: number) =>
  month + 1 < 12 ? '0' + (month + 1) + '' : month + 1 + '';

const formatDate = (year: number, month: number, day: number) =>
  year + '-' + formatMonth(month) + '-' + formatDay(day);
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
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDay = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return DAYS[date.getDay()];
};

export { formatDate, getDay, TIMEZONE };
