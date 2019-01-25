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
const getCreditStartCostCom = state => Number(number(state.credit.creditStartCostCom));
const getCreditFinCostCom = state => Number(number(state.credit.creditFinCostCom));
const getCreditAcCountCom = state => Number(number(state.credit.creditAcCountCom));
// const getRadio = state => state.depo.radio;

const ceilMethod = value => Number(value.toFixed(2));

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
    getCreditStartCostCom,
    getCreditFinCostCom,
    getCreditAcCountCom,
    // getRadio,
  ],
  (
    creditPrincipal: number,
    creditInterest: number,
    creditDateOpen: Date,
    creditSrok: number,
    creditSrokOption: number,
    creditPlatez: number,
    creditEdinCom: number,
    creditEdinComOption: number,
    creditStartCostCom: number,
    creditFinCostCom: number,
    creditAcCountCom: number,
    // radio: number,
  ) => {
    const payments = creditSrokOption === 0 ? Number(creditSrok) : Number(creditSrok) * 12;
    const edinCom = creditEdinComOption === 0 ? (creditPrincipal * creditEdinCom) / 100 : creditEdinCom;
    const creditDateClosed = DateTime.fromJSDate(creditDateOpen)
      .plus({
        months: payments,
      })
      .toJSDate();
    const startDate = DateTime.fromJSDate(creditDateOpen);
    const endDate = DateTime.fromJSDate(creditDateClosed);
    const days = endDate.diff(startDate, ['days']).as('days');

    const table: {
      n: number[],
      date: string[],
      daysY: number[],
      telo: number[],
      procentFast: number[],
      payMonths: number[],
      vsego: number[],
      principalA: number[],
      pereplata: number[],
    } = {
      n: [], // №
      date: [], // дата
      daysY: [], // дни
      telo: [], // погашение тела кредита
      procentFast: [], // платеж по процентам
      payMonths: [], // комиссионные платежи
      vsego: [], // общая сумма платежа
      principalA: [], // основной остаток долга
      pereplata: [], // переплата
    };

    let vsego = 0; // итого к оплате
    let monthlyAll; // Ваш ежемесячный платёж
    let pereplata = 0; // Сумма переплаты
    let comPayments; // комиссионные платежи
    let interestPayments; // на оплату процентов

    let ostatok = creditPrincipal;
    let payStart = 0;
    let payFin = 0;
    let payAccount = 0;
    let payMonths = 0;
    let daysY: number;

    let payProcent = 0;
    let principalA = creditPrincipal;

    if (creditPrincipal > 0) {
      // если ануитет
      if (creditPlatez === 0) {
        const x = (1 + (creditInterest * 365) / 12) ** payments;
        // равный месячный платёж - аннуитет
        const monthly = (creditPrincipal * x * creditInterest * 365) / 12 / (x - 1);
        for (let i = 0; i < payments; i++) {
          ostatok -= monthly - (ostatok * creditInterest * 365) / 12;
          payStart = (creditPrincipal * creditStartCostCom) / 100;
          payFin = (ostatok * creditFinCostCom) / 100;
          payAccount = creditAcCountCom;
          payMonths += payStart + payFin + payAccount;
          const cycleStartDate = startDate.plus({ months: i });
          const cycleEndDate = startDate.plus({ months: i + 1 });
          daysY = cycleEndDate.diff(cycleStartDate, ['days']).as('days');
          // месячный платёж по % = ОстатокСсуднойЗадолженности * месячная % ставка;
          const procentFast = (principalA * creditInterest * 365) / 12;
          // тело кредита = равный месячный платёж - месячный платёж по процентам
          const telo = monthly - procentFast;
          principalA -= telo; // остаток ссудной задолженности
          vsego += monthly + payStart + payFin + payAccount; // итого к оплате
          pereplata += procentFast + payStart + payFin + payAccount;
          table.n.push(i + 1); // №
          table.date.push(initDate(cycleEndDate.toJSDate())); // дата
          table.daysY.push(daysY); // дни
          table.telo.push(telo); // тело кредита
          table.procentFast.push(procentFast); // месячный платёж по процентам
          table.payMonths.push(payStart + payFin + payAccount); // комиссионные платежи
          table.vsego.push(vsego); // общая сумма платежа
          // остаток ссудной задолженности
          table.principalA.push(Math.abs(ceilMethod(principalA)));
          table.pereplata.push(pereplata); // переплата
        }
        monthlyAll = vsego / payments; // Ваш ежемесячный платёж
        vsego += edinCom; // итого к оплате
        pereplata = vsego - creditPrincipal; // Сумма переплаты
        comPayments = payMonths + edinCom; // комиссионные платежи
        interestPayments = pereplata - comPayments; // на оплату процентов
      } else if (creditPlatez === 1) {
        // переплата =  процентная ставка * сумма кредита * месяцы
        pereplata = creditInterest * creditPrincipal * days + edinCom;
        vsego = pereplata + creditPrincipal; // итого к оплате
        comPayments = creditEdinCom;
        interestPayments = pereplata - comPayments;
      } else if (creditPlatez === 2) {
        const telo = creditPrincipal / payments;
        for (let i = 0; i < payments; i++) {
          const cycleStartDate = startDate.plus({ months: i });
          const cycleEndDate = startDate.plus({ months: i + 1 });
          daysY = cycleEndDate.diff(cycleStartDate, ['days']).as('days');
          const procentFast = principalA * creditInterest * daysY;
          const monthly = telo + procentFast;
          payStart += (creditPrincipal * creditStartCostCom) / 100;
          ostatok -= telo;
          payFin += (ostatok * creditFinCostCom) / 100;
          payAccount += creditAcCountCom;
          payProcent += procentFast;
          vsego += monthly; // итого к оплате
          principalA -= telo;
        }
        payMonths = payStart + payFin + payAccount;
        pereplata = payProcent + payMonths + edinCom; // Сумма переплаты
        vsego = vsego + payMonths + edinCom; // итого к оплате
        monthlyAll = vsego / payments; // Ваш ежемесячный платёж
        comPayments = payMonths + edinCom; // комиссионные платежи
        interestPayments = pereplata - comPayments;
      }
    }

    return {
      creditDateClosed,
      monthlyAll, // Ваш ежемесячный платёж
      vsego, // итого к оплате
      pereplata, // Сумма переплаты
      comPayments, // комиссионные платежи
      interestPayments, // на оплату процентов
      table,
    };
  },
);
