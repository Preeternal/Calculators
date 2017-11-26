export const daysYfun = (dateY, dateY1, dateOpen, oneDay) => {

  if (dateY.getDate() === dateOpen.getDate()) { //если число совпадает с начальной датой
    if (dateY1.getMonth() === 11) {
      dateY.setDate(dateOpen.getDate());
      dateY.setYear(dateY1.getFullYear() + 1);
      dateY.setMonth(0); // прибавить месяц
    } else {
      dateY.setDate(dateOpen.getDate());
      dateY.setYear(dateY1.getFullYear());
      dateY.setMonth(dateY1.getMonth() + 1); //прибавить месяц
    }
  } else {
    if (dateY1.getMonth() === 11) {
      dateY.setYear(dateY1.getFullYear() + 1);
      dateY.setMonth(0); //прибавить месяц
      dateY.setDate(dateOpen.getDate());
    } else {
      dateY.setYear(dateY1.getFullYear());
      dateY.setMonth(dateY1.getMonth() + 1); //прибавить месяц
      dateY.setDate(dateOpen.getDate());
    }
  }

  let x = 0;
  if (dateY.getDate() != dateOpen.getDate()) {
    const dateY2 = new Date();
    dateY2.setTime(dateY.getTime());
    if (dateY.getMonth() === 0) {
      dateY2.setYear(dateY.getFullYear() - 1);
      dateY2.setMonth(11);
    } else {
      dateY2.setMonth(dateY.getMonth() - 1);
      dateY2.setYear(dateY.getFullYear());
    }
    x = parseFloat(dateY1.getDate() - Math.round((dateY.getTime() - dateY2.getTime()) / oneDay));
    dateY.setTime(dateY.getTime() - x * oneDay);
    // фиксируем отчётный период на последнем дне месяца
  }

  const daysY = Math.round((dateY.getTime() - dateY1.getTime()) / oneDay);
  return daysY;
};
