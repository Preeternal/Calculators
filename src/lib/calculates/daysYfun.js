// @flow

// const addMonth = (dateY1: Date, dateOpen: Date): Date => {
//   const dateY: Date = new Date();
//   if (dateY1.getMonth() === 11) {
//     dateY.setDate(dateOpen.getDate());
//     dateY.setFullYear(dateY1.getFullYear() + 1);
//     dateY.setMonth(0); // прибавить месяц
//   } else {
//     dateY.setDate(dateOpen.getDate());
//     dateY.setFullYear(dateY1.getFullYear());
//     dateY.setMonth(dateY1.getMonth() + 1); //прибавить месяц
//   }
//   return dateY;
// };

// const addMonth = (dY1: Date): Date => {
//   //const d = new Date();
//   const year = dY1.getFullYear();
//   const month = dY1.getMonth();
//   const day = dY1.getDate();
//   return new Date(year, month + 1, day);
// };

export const daysYfun = (
  dateY: Date,
  dateY1: Date,
  dateOpen: Date,
  oneDay: number,
): number => {
  // dateY = addMonth(dateY1);
  dateY.setMonth(dateY1.getMonth() + 1);

  // if (dateY.getDate() === dateOpen.getDate()) {
  //   //если число совпадает с начальной датой
  //   if (dateY1.getMonth() === 11) {
  //     dateY.setDate(dateOpen.getDate());
  //     dateY.setFullYear(dateY1.getFullYear() + 1);
  //     dateY.setMonth(0); // прибавить месяц
  //   } else {
  //     dateY.setDate(dateOpen.getDate());
  //     dateY.setFullYear(dateY1.getFullYear());
  //     dateY.setMonth(dateY1.getMonth() + 1); //прибавить месяц
  //   }
  // } else {
  //   if (dateY1.getMonth() === 11) {
  //     dateY.setFullYear(dateY1.getFullYear() + 1);
  //     dateY.setMonth(0); //прибавить месяц
  //     dateY.setDate(dateOpen.getDate());
  //   } else {
  //     dateY.setFullYear(dateY1.getFullYear());
  //     dateY.setMonth(dateY1.getMonth() + 1); //прибавить месяц
  //     dateY.setDate(dateOpen.getDate());
  //   }
  // }

  // let x = 0;
  // if (dateY.getDate() !== dateOpen.getDate()) {
  //   const dateY2 = new Date();
  //   dateY2.setTime(dateY.getTime());
  //   if (dateY.getMonth() === 0) {
  //     dateY2.setFullYear(dateY.getFullYear() - 1);
  //     dateY2.setMonth(11);
  //   } else {
  //     dateY2.setMonth(dateY.getMonth() - 1);
  //     dateY2.setFullYear(dateY.getFullYear());
  //   }
  //   x = dateY1.getDate() - Math.round((dateY.getTime() - dateY2.getTime()) / oneDay);
  //   dateY.setTime(dateY.getTime() - x * oneDay);
  //   // фиксируем отчётный период на последнем дне месяца
  // }

  const daysY = Math.round((dateY.getTime() - dateY1.getTime()) / oneDay);
  return daysY;
};
