export const twoDigitsNumbers = (number: number): string => {
  return number < 10 ? '0' + number : String(number);
};

export const getHumanizeDateAndTime = (
  date: string,
  duration?: number
): string => {
  let dateInCurrentTimeZone;
  if (duration) {
    dateInCurrentTimeZone = new Date(
      +new Date(date + ' GMT+0300') + 1000 * 60 * duration
    );
  } else {
    dateInCurrentTimeZone = new Date(date + ' GMT+0300');
  }
  const oldDate = new Date(date);
  let years: string = String(dateInCurrentTimeZone.getFullYear());
  let months: string = twoDigitsNumbers(dateInCurrentTimeZone.getMonth());
  let days: string = twoDigitsNumbers(dateInCurrentTimeZone.getDate());
  let hours: string = twoDigitsNumbers(dateInCurrentTimeZone.getHours());
  let minutes: string = twoDigitsNumbers(dateInCurrentTimeZone.getMinutes());
  if (oldDate.getDate() === dateInCurrentTimeZone.getDate()) {
    return `${hours}:${minutes}`;
  }
  return `${days}/${months}/${years} ${hours}:${minutes}`;
};

export const getArrivalTime = (time: string, duration: number) => {
  return new Date(+new Date(time) + duration);
};

export const getTimeToTravel = (
  dateStart: string,
  dateEnd: string,
  duration: number
) => {
  if (dateEnd === '') return duration + ' минут';
  duration = +new Date(dateEnd) - +new Date(dateStart) + 1000 * 60 * duration;
  let hours = Math.trunc(duration / 1000 / 60 / 60);
  let minutes = Math.trunc((duration / 1000 / 60) % 60);
  if (hours === 1) return `${hours} час ${minutes} минут`;
  if (hours > 4) return `${hours} часов ${minutes} минут`;
  if (hours > 1) return `${hours} часа ${minutes} минут`;
};

export const ticketsOutput = (count: number) => {
  let result = '';
  let count10 = count % 10;
  if (count10 === 1 && count !== 11) {
    result = 'билет';
  } else if (count10 && count10 < 5 && (count < 10 || count > 14)) {
    result = 'билета';
  } else result = 'билетов';
  return count + ' ' + result;
};
