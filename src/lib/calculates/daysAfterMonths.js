//@flow
export const daysAfterMonths = (
  dateOpen: Date,
  dateClosed: Date,
  oneDay: number
): { days1: number, cf: number } => {
  let days1: number = parseFloat(dateClosed.getDate() - dateOpen.getDate());
  let cf = 0;
  const dateZ = new Date();
  dateZ.setTime(dateOpen.getTime());
  let x = 0;
  if (days1 < 0) {
    if (dateOpen.getMonth() === 0) {
      dateZ.setFullYear(dateOpen.getFullYear() - 1);
      dateZ.setMonth(11);
    } else {
      dateZ.setFullYear(dateOpen.getFullYear());
      dateZ.setMonth(dateOpen.getMonth() - 1);
    }
    dateZ.setDate(dateOpen.getDate());

    days1 = Math.round((dateOpen.getTime() - dateZ.getTime()) / oneDay) + days1;
    if (days1 < 0) {
      x = parseFloat(
        dateOpen.getDate() - Math.round((dateOpen.getTime() - dateZ.getTime()) / oneDay)
      );
      dateZ.setTime(dateZ.getTime() - x * oneDay);
      // фиксируем отчётный период на последнем дне месяца
      days1 = Math.round((dateOpen.getTime() - dateZ.getTime()) / oneDay) + days1;
    }
    cf = 1;
  }
  return { days1, cf };
};
