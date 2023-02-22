import moment from 'moment';

function formatDate(dateString: string): string {
  const date = moment(dateString);
  const month = date.format('M');
  const day = date.format('D');
  const hour = date.format('h');
  const minute = date.format('m');
  const ampm = date.format('A') === 'AM' ? '오전' : '오후';
  const monthStr = `${month}월`;
  return `${monthStr} ${day}일 ${ampm} ${hour}시 ${minute}분`;
}

function formatDateWithDayOfWeek(dateString: string): string {
  const date = moment(dateString);
  const year = date.format('YYYY');
  const month = date.format('M');
  const day = date.format('D');
  const dayOfWeek = date.format('ddd');
  const monthStr = `${month}월`;
  return `${year}년 ${monthStr} ${day}일 (${dayOfWeek})`;
}

export { formatDate, formatDateWithDayOfWeek };
