export const monthsString = (months) => {
  let mesyacyi;
  let ili;
  const monthsInString = months.toString();
  const si = parseInt(monthsInString.charAt(monthsInString.length - 1), 10);
  const si2 = parseInt(monthsInString.charAt(monthsInString.length - 2), 10);
  if 	((si === 0) && (monthsInString.length === 1)) {
    mesyacyi = '';
    months = '';
    //daysM = '';
    //dniM = '';
    ili = '';
  } else if ((si === 1) && (si2 !== 1)) {
    mesyacyi = ' месяц ';
    ili = ' или ';
  } else if ((si <= 4) && (si !== 0) && (si !== 1) && (si2 !== 1)) {
    mesyacyi = ' месяца ';
    ili = ' или ';
  } else if ((si > 4) || (si2 === 1) || (si === 0)) {
    mesyacyi = ' месяцев ';
    ili = ' или ';
  }
  return { mesyacyi, months, ili };
};
