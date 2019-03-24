// @flow
// import { DateTime } from 'luxon';
import { currentLocale } from '../../locales/i18n';

export const initDate = (dateL: Date): string => {
  // const date = DateTime.fromJSDate(dateL);
  const DD = dateL.getDate() < 10 ? '0' : 0;
  const MM = dateL.getMonth() < 9 ? '0' : 0;
  if (currentLocale.indexOf('ru') === 0) {
    return `${DD + dateL.getDate()}.${MM + (dateL.getMonth() + 1)}.${dateL.getFullYear()}`;
    // return date.setLocale('ru').toLocaleString(DateTime.DATE_SHORT);
  }
  return `${MM + (dateL.getMonth() + 1)}/${DD + dateL.getDate()}/${dateL.getFullYear()}`;
  // return date.setLocale('en').toLocaleString(DateTime.DATE_SHORT);
};
