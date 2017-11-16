import {
  //initDate,
  changeDate
} from '../lib';
import {
  daysString,
  monthsString
} from './calculates';


export const calculate = (principal, dateOpen, dateClosed) => {
  dateOpen = changeDate(dateOpen);
  dateClosed = changeDate(dateClosed);
  const oneMinute = 60 * 1000;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  //const oneWeek = oneDay * 7;

  const days = Math.round(
    (dateClosed.getTime() - dateOpen.getTime()) / oneDay
  );
  const dni = daysString(days);


  const cf = 0;

  let months =
    (((dateClosed.getFullYear() - dateOpen.getFullYear()) * 12)
    + ((dateClosed.getMonth() + 1) - (dateOpen.getMonth() + 1))) - cf;
  //let mesyacyi;
  //let ili = ' или ';

  const Months = monthsString(months);
  const mesyacyi = Months.mesyacyi;
   months = Months.months;
  const ili = Months.ili;


  // const monthsInString = months.toString();
  // const si = parseInt(monthsInString.charAt(monthsInString.length - 1), 10);
  // const si2 = parseInt(monthsInString.charAt(monthsInString.length - 2), 10);
  // if 	((si === 0) && (monthsInString.length === 1)) {
  //   mesyacyi = '';
  //   months = '';
  //   //daysM = '';
  //   //dniM = '';
  //   ili = '';
  // } else if ((si === 1) && (si2 !== 1)) {
  //   mesyacyi = ' месяц ';
  // } else if ((si <= 4) && (si !== 0) && (si !== 1) && (si2 !== 1)) {
  //   mesyacyi = ' месяца ';
  // } else if ((si > 4) || (si2 === 1) || (si === 0)) {
  //   mesyacyi = ' месяцев ';
  // }
  const result = {};
  result.srok = days > 0 ? days + dni + ili + months + mesyacyi : undefined;
  result.principal2 = principal * 2;
  result.principal3 = result.principal2 / 4;
  return result;
};
