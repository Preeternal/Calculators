import {
  //initDate,
  changeDate
} from '../lib';
import {
  daysString,
  monthsString,
  daysAfterMonths
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
  const DaysString = daysString(days);
  const dni = DaysString.dni;

  const DaysAfterMonths = daysAfterMonths(dateOpen, dateClosed, oneDay);
  let days1 = DaysAfterMonths.days1;
  const cf = DaysAfterMonths.cf;

  const DaysString1 = daysString(days1);
  days1 = DaysString1.days;
  let dni1 = DaysString1.dni;

  let months =
    (((dateClosed.getFullYear() - dateOpen.getFullYear()) * 12)
    + ((dateClosed.getMonth() + 1) - (dateOpen.getMonth() + 1))) - cf;

  const Months = monthsString(months, days1, dni1);
  const ili = Months.ili;
  months = Months.months;
  const mesyacyi = Months.mesyacyi;
  days1 = Months.days1; //убирает дни если срок < 1 месяца
  dni1 = Months.dni1;

  const srok = days > 0 ? days + dni + ili + months + mesyacyi + days1 + dni1
    : undefined;
  const principal2 = principal * 2;
  const principal3 = principal2 / 4;
  return { principal2, principal3, srok };
};
