import {
  //initDate,
  changeDate
} from '../lib';
import {
  daysString,
  monthsString,
  daysAfterMonths,
  daysYfun
} from './calculates';

export const calculate = (
  principal,
  dateOpen,
  dateClosed,
  interest1,
  platez,
  plusperiod,
  prinplus
) => {
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

  let totalinterest1 = 0;
  let principal1 = 0;
  //payments = months;
  //var principal1=parseFloat(principal);
  // var dateY = new Date();
  // var dateY1 = new Date();
  // dateY.setTime(date1.getTime());
  // dateY1.setTime(date1.getTime());
  //let x = 0;
  const dateY = new Date();
  const dateY1 = new Date();
  dateY.setTime(dateOpen.getTime());
  dateY1.setTime(dateOpen.getTime());
  let zxc = 0;
  let cxz = 0;
  if (days !== '')	{
    if (days > 0) {
      for (var i = 1; i <= months; i++) {

        const daysY = daysYfun(dateY, dateY1, dateOpen, oneDay);

        if (plusperiod === 0) {
          zxc = 0;
        } else if (plusperiod == 2) {
          if (i > 1) {
            zxc = prinplus;
          } else {
            zxc = 0;
          }
        } else if (plusperiod == 3) {
          if (i / 3 === Math.floor(i / 3)) {
            zxc = prinplus;
          } else {
            zxc = 0;
          }
        } else if (plusperiod == 4) {
          if (i / 12 === Math.floor(i / 12)) {
            zxc = prinplus;
          } else {
            zxc = 0;
          }
        }

        if (platez === 0) {
          totalinterest1 = principal * interest1 * daysY;	// начислено процентов
          principal1 = totalinterest1 + principal1 + zxc; // вклад + процент за последний месяц в цикле
          cxz += zxc;
        } else if (platez === 1) {
          totalinterest1 = (parseFloat(principal) + cxz) * interest1 * daysY;	// начислено процентов
          principal1 = totalinterest1 + principal1 + zxc; // вклад + проценты за весь период депозита
          cxz += zxc;
        }

        dateY1.setTime(dateY.getTime());
      }
    }
  }

  const principal2 = principal * 2;
  const principal3 = principal2 / 4;
  return { principal2, principal3, srok };
};
