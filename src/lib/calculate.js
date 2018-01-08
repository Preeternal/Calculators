import {
  initDate,
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
  interest2,
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
  let principal1 = principal;
  const dateY = new Date();
  const dateY1 = new Date();
  dateY.setTime(dateOpen.getTime());
  dateY1.setTime(dateOpen.getTime());
  let zxc = 0;
  let cxz = 0;
  let daysY;
  let totalinterest2 = 0;
  const n = days1 !== '' ? 1 : 0;
  // const table = (date) => {
  //   this.date = date;
  // };
  const table = [];
  table.n = [];
  table.date = [];
  table.totalinterest1 = [];
  table.daysY = [];
  table.totalinterest2 = [];
  table.principal1 = [];

  if (days !== '')	{
    if (days > 0) {
      for (let i = 0; i < months + n; i++) {
        
        if (i < months) {

          daysY = daysYfun(dateY, dateY1, dateOpen, oneDay);

          if (plusperiod === 0) {
            zxc = 0;
          } else if (plusperiod === 1) {
            if (i > 0) {
              zxc = prinplus;
            } else {
              zxc = 0;
            }
          } else if (plusperiod === 2) {
            if ((i + 1) / 3 === Math.floor((i + 1) / 3)) {
              zxc = prinplus;
            } else {
              zxc = 0;
            }
          } else if (plusperiod === 3) {
            if ((i + 1) / 12 === Math.floor((i + 1) / 12)) {
              zxc = prinplus;
            } else {
              zxc = 0;
            }
          }        
        
          if (platez === 0) {
            // начислено процентов
            totalinterest1 = principal1 * interest1 * daysY;
                       
          } else if (platez === 1) {
            // начислено процентов
            totalinterest1 = (principal + cxz) * interest1 * daysY;            
          }
          dateY1.setTime(dateY.getTime());          
          cxz += zxc; // пополнение за весь срок          
          // вклад + процент за последний месяц в цикле:
          principal1 = totalinterest1 + principal1 + zxc; 
          table.date.push(initDate(dateY)); // дата
          table.daysY.push(daysY); // дни

        } else if (i === months) {  

          if (platez === 0) {
            // начислено процентов
            totalinterest1 = principal1 * interest2 * days1;            
          } else if (platez === 1) {
            // начислено процентов
            totalinterest1 = (principal + cxz) * interest2 * days1;            
          }
          // вклад + процент за последний месяц в цикле:
          principal1 = totalinterest1 + principal1; 
          table.date.push(initDate(dateClosed)); // дата
          table.daysY.push(days1); // дни
        }
               
        totalinterest2 += totalinterest1; // начислено процентов итого     
        table.n.push(i + 1); // №        
        table.totalinterest1.push(totalinterest1.toFixed(2));// начислено %     
        table.totalinterest2.push(totalinterest2.toFixed(2));// начислено % итого
        // вклад + процент за последний месяц в цикле:
        table.principal1.push(principal1.toFixed(2));
        //console.log(table);
        //console.log(totalinterest1);
      }
    }
  }

  // console.log(table);
  // console.log(table.date);

  //месячная выручка (в среднем)
  const payment = ((principal1 - principal) + cxz) / months; 
  //Сумма выплаты всех начислений
  const principal2 = principal1 - principal - cxz; 

  return { srok, payment, principal2, principal1, table };
};
