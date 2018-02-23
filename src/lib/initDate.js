//@flow
import { currentLocale } from '../../locales/i18n';
export const initDate = (dateL: Date): string => {
  const DD = dateL.getDate() < 10 ? '0' : 0;
  const MM = dateL.getMonth() < 9 ? '0' : 0;
  if (currentLocale.indexOf('ru') === 0) {
    return `${DD + dateL.getDate()}.${MM + (dateL.getMonth() + 1)}.${dateL.getFullYear()}`;
  } else {
    return `${MM + (dateL.getMonth() + 1)}/${DD + dateL.getDate()}/${dateL.getFullYear()}`;
  }
};
