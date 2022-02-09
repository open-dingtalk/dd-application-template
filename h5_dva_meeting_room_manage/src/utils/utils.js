import moment from 'moment';

moment.locale('zh-CN');

const times = [];

const getStartTime = i => {
  const num1 = String(parseInt(i / 2, 10)).padStart(2, '0');
  const num2 = String(parseInt(i % 2 === 0 ? '0' : '30', 10)).padStart(2, '0');
  return `${num1}:${num2}`;
}

const getEndTime = i => {
  const num1 = String(parseInt(i / 2, 10)).padStart(2, '0');
  const num3 = i % 2 === 0 ? num1 : String(parseInt(i / 2, 10) + 1).padStart(2, '0')
  const num4 = String(parseInt(i % 2 === 0 ? '30' : '0', 10)).padStart(2, '0');
  return `${num3}:${num4}`;
}

for(let i = 0; i < 48; i += 1) {
  // 00:00 - 00:30   1,2,3,4
  times.push({
    content: `${getStartTime(i)} - ${getEndTime(i)}`,
    value: i
  });
}

const getRangeStrWithSeconds = (start, end) => {
  if (start > end) {
    [start, end] = [end, start];
  }
  const startYear = moment(start).format('ll');
  const endYear = moment(end).format('ll');
  const startTime = moment(start).format('HH:mm');
  const endTime = moment(end).format('HH:mm');
  if (startYear === endYear) {
    return `${startYear} ${startTime}-${endTime}`;
  }
  return `${startYear} ${startTime}-${endYear} ${endTime}`;
}

const getYear = time => {
  return moment(time).format('YYYY-MM-DD');
}

const getDateArray = (time, hm) => {
  const dateArray = getYear(time).split('-');
  dateArray[1] = Number(dateArray[1]) - 1;
  const hms = hm.split(':');
  dateArray.push(...hms);
  return dateArray;
}

export {
  times,
  getStartTime,
  getEndTime,
  getRangeStrWithSeconds,
  getYear,
  getDateArray,
}
