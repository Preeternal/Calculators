export const monthsString = (months, days1, dni1) => {
  let mesyacyi;
  let ili = ' или ';
  const monthsInString = months.toString();
  const si = parseInt(monthsInString.charAt(monthsInString.length - 1), 10);
  const si2 = parseInt(monthsInString.charAt(monthsInString.length - 2), 10);
  if 	((si === 0) && (monthsInString.length === 1)) {
    mesyacyi = '';
    months = '';
    days1 = '';
    dni1 = '';
    ili = '';
  } else if ((si === 1) && (si2 !== 1)) {
    mesyacyi = ' месяц ';
  } else if ((si <= 4) && (si !== 0) && (si !== 1) && (si2 !== 1)) {
    mesyacyi = ' месяца ';
  } else if ((si > 4) || (si2 === 1) || (si === 0)) {
    mesyacyi = ' месяцев ';
  }
  //console.log(ili, months, mesyacyi, days1, dni1);
  return { ili, months, mesyacyi, days1, dni1 };
};
