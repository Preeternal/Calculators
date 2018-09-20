//@flow
import { strings } from '../../../locales/i18n';
export const monthsString = (months: number): string => {
  let mesyacyi;
  const monthsInString = months.toString();
  const si = parseInt(monthsInString.charAt(monthsInString.length - 1), 10);
  const si2 = parseInt(monthsInString.charAt(monthsInString.length - 2), 10);
  if (si === 0 && monthsInString.length === 1) {
    mesyacyi = '';
  } else if (si === 1 && si2 !== 1) {
    //mesyacyi = 'месяц';
    mesyacyi = strings('result.srok.mesyacyi.mesyacyi1');
  } else if (si <= 4 && si !== 0 && si !== 1 && si2 !== 1) {
    //mesyacyi = 'месяца';
    mesyacyi = strings('result.srok.mesyacyi.mesyacyi2');
  } else if (si > 4 || si2 === 1 || si === 0) {
    //mesyacyi = 'месяцев';
    mesyacyi = strings('result.srok.mesyacyi.mesyacyi3');
  } else {
    mesyacyi = '';
  }
  return mesyacyi;
};
