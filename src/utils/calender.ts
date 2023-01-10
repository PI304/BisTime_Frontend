const formatDay = (day: number) => (day < 10 ? '0' + day + '' : day + '');

const formatMonth = (month: number) =>
  month + 1 < 12 ? '0' + (month + 1) + '' : month + 1 + '';

const formatDate = (year: number, month: number, day: number) =>
  year + '-' + formatMonth(month) + '-' + formatDay(day);

export { formatDate };
