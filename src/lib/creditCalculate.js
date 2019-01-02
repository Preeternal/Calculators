// @flow
import { createSelector } from 'reselect';
import { DateTime } from 'luxon';
import { strings } from '../../locales/i18n';
import { initDate, number } from '.';
import { daysString, monthsString, daysAfterMonths } from './calculates';

const getCreditPrincipal = state => Number(number(state.credit.creditPrincipal));
const getCreditInterest = state => Number(number(state.credit.creditInterest)) / 365 / 100;
const getCreditDateOpen = state => state.credit.creditDateOpen;
const getCreditSrok = state => Number(number(state.credit.creditSrok));
const getCreditSrokOption = state => state.credit.creditSrokOption;
const getCreditPlatez = state => state.credit.creditPlatez;
const getCreditEdinCom = state => Number(number(state.credit.creditEdinCom));
const getCreditEdinComOption = state => state.credit.creditEdinComOption;
const getСreditFinCostCom = state => Number(number(state.credit.creditFinCostCom));
const getСreditAcCountCom = state => Number(number(state.credit.creditAcCountCom));
const getRadio = state => state.depo.radio;

export const creditCalculate = createSelector(
  [
    getCreditPrincipal,
    getCreditInterest,
    getCreditDateOpen,
    getCreditSrok,
    getCreditSrokOption,
    getCreditPlatez,
    getCreditEdinCom,
    getCreditEdinComOption,
    getСreditFinCostCom,
    getСreditAcCountCom,
    getRadio,
  ],
  (
    creditPrincipal: string,
    creditInterest: string,
    creditDateOpen: Date,
    creditSrok: string,
    creditSrokOption: number,
    creditPlatez: number,
    creditEdinCom: string,
    creditEdinComOption: number,
    creditStartCostCom: string,
    creditFinCostCom: string,
    creditAcCountCom: string,
    radio: number,
  ) => {
    // const dOpen: Date = changeDate(dateOpen);
    // const dClosed: Date = changeDate(dateClosed);
    const creditDateClosed = initDate(
      DateTime.fromJSDate(creditDateOpen)
        .plus({
          months: creditSrokOption === 0 ? Number(creditSrok) : Number(creditSrok) * 12,
        })
        .toJSDate(),
    );
    const oneMinute = 60 * 1000;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    // const taxForRF = taxRate === 0 ? 0.35 : 0.3;
    // Ставка налога на процентные доходы по вкладам для лиц,
    // являющихся налоговыми резидентами Российской Федерации
    // и получающих такие доходы, составляет 35%;
    // для нерезидентов (фактически находящихся на территории Российской
    // Федерации менее 183 дней в календарном году) — 30%.
    const interestLimit = radio === 2 ? (8 + 5) / 365 / 100 : 9 / 365 / 100;

    // const days = Math.round((dClosed.getTime() - dOpen.getTime()) / oneDay);
    // const dni: string = daysString(days); // '', день, дня, дней
    // const DaysAfterMonths: { days1: number, cf: number } = daysAfterMonths(dOpen, dClosed);
    // const { days1, cf } = DaysAfterMonths;
    // const dni1: string = daysString(days1); // '', день, дня, дней

    // const months = (dClosed.getFullYear() - dOpen.getFullYear()) * 12
    //   + (dClosed.getMonth() + 1 - (dOpen.getMonth() + 1))
    //   - cf;
    // const mesyacyi: string = monthsString(months); // '',  месяц , месяца, месяцев

    // const ili: string = strings('result.srok.ili');

    // const srok = (() => {
    //   switch (true) {
    //     case days <= 0:
    //       return undefined;
    //     case months === 0:
    //       return `${days} ${dni}`;
    //     case days1 === 0:
    //       return `${days} ${dni} ${ili} ${months} ${mesyacyi}`;
    //     default:
    //       return `${days} ${dni}  ${ili} ${months} ${mesyacyi} ${days1} ${dni1}`;
    //   }
    // })();

    // let totalinterest1 = 0;
    // let tax = 0;
    // let principal1 = principal;
    // // const dateY = new Date();
    // // const dateY1 = new Date();
    // // dateY.setTime(dOpen.getTime());
    // // dateY1.setTime(dOpen.getTime());
    // let adjunction = 0; // пополнение в цикле
    // let adjunctionAll = 0; // пополнение за весь срок
    // let daysY: number;
    // let totalinterest2 = 0;
    // const payments = days1 !== 0 || months === 0 ? months + 1 : months;

    // const table: {
    //   n: number[],
    //   date: string[],
    //   totalinterest1: number[],
    //   daysY: number[],
    //   totalinterest2: number[],
    //   principal1: number[],
    // } = {
    //   n: [], // №
    //   date: [], // дата
    //   totalinterest1: [], // начислено %
    //   daysY: [], // дни
    //   totalinterest2: [], // начислено % итого
    //   principal1: [], // общая сумма
    // };

    // if (days > 0) {
    //   for (let i = 0; i < payments; i++) {
    //     if (i < months) {
    //       if (plusperiod === 0) {
    //         adjunction = 0; // пополнение
    //       } else if (plusperiod === 1) {
    //         if (i > 0) {
    //           adjunction = prinplus;
    //         } else {
    //           adjunction = 0;
    //         }
    //       } else if (plusperiod === 2) {
    //         if ((i + 1) / 3 === Math.floor((i + 1) / 3)) {
    //           adjunction = prinplus;
    //         } else {
    //           adjunction = 0;
    //         }
    //       } else if (plusperiod === 3) {
    //         if ((i + 1) / 12 === Math.floor((i + 1) / 12)) {
    //           adjunction = prinplus;
    //         } else {
    //           adjunction = 0;
    //         }
    //       }
    //       const endDate = DateTime.fromJSDate(dOpen).plus({ months: i + 1 });
    //       const startDate = DateTime.fromJSDate(dOpen).plus({ months: i });
    //       daysY = endDate.diff(startDate, ['days']).as('days');
    //       // dateY.setMonth(dateY1.getMonth() + 1);
    //       // daysY = Math.round((dateY.getTime() - dateY1.getTime()) / oneDay);
    //       if (platez === 0) {
    //         // начислено процентов
    //         totalinterest1 = principal1 * interest1 * daysY;
    //       } else if (platez === 1) {
    //         // начислено процентов
    //         totalinterest1 = (principal + adjunctionAll) * interest1 * daysY;
    //       }
    //       if (taxCheck === 0) {
    //         if (country === 2) {
    //           // налог Украина
    //           tax += 0.195 * totalinterest1;
    //           totalinterest1 -= 0.195 * totalinterest1;
    //         } else if (country === 0 && interest1 > interestLimit) {
    //           // налог Россия
    //           tax += ((interest1 - interestLimit) / interest1) * totalinterest1 * taxForRF;
    //           totalinterest1
    //             -= ((interest1 - interestLimit) / interest1) * totalinterest1 * taxForRF;
    //         }
    //       }
    //       // dateY1.setTime(dateY.getTime());
    //       adjunctionAll += adjunction; // пополнение за весь срок
    //       // вклад + процент за последний месяц в цикле:
    //       principal1 = totalinterest1 + principal1 + adjunction;
    //       // table.date.push(initDate(dateY)); // дата
    //       table.date.push(initDate(endDate.toJSDate())); // дата
    //       table.daysY.push(daysY); // дни
    //     } else if (i === months || months === 0) {
    //       if (platez === 0) {
    //         // начислено процентов
    //         totalinterest1 = principal1 * interest2 * days1;
    //       } else if (platez === 1) {
    //         // начислено процентов
    //         totalinterest1 = (principal + adjunctionAll) * interest2 * days1;
    //       }
    //       if (taxCheck === 0) {
    //         if (country === 2) {
    //           // налог Украина
    //           tax += 0.195 * totalinterest1;
    //           totalinterest1 -= 0.195 * totalinterest1;
    //         } else if (country === 0 && interest2 > interestLimit) {
    //           // налог Россия
    //           tax += ((interest2 - interestLimit) / interest2) * totalinterest1 * taxForRF;
    //           totalinterest1
    //             -= ((interest2 - interestLimit) / interest2) * totalinterest1 * taxForRF;
    //         }
    //       }
    //       // вклад + процент за последний месяц в цикле:
    //       principal1 = totalinterest1 + principal1;
    //       table.date.push(initDate(dClosed)); // дата
    //       table.daysY.push(days1); // дни
    //     }
    //     totalinterest2 += totalinterest1; // начислено процентов итого
    //     table.n.push(i + 1); // №
    //     table.totalinterest1.push(totalinterest1); // начислено %
    //     table.totalinterest2.push(totalinterest2); // начислено % итого
    //     // вклад + процент за последний месяц в цикле:
    //     table.principal1.push(principal1);
    //   }
    // }

    // месячная выручка (в среднем)
    // const payment = (principal1 - principal - adjunctionAll) / months;

    // Начисленные проценты
    // const principal2 = principal1 - principal - adjunctionAll;

    return {
      creditDateClosed,
      // days1,
      // srok,
      // principal2,
      // principal1,
      // tax,
      // adjunctionAll,
      // table,
    };
  },
);
