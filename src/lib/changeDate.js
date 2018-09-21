// @flow
import { currentLocale } from '../../locales/i18n';

export const changeDate = (dateL: string): Date => {
  if (currentLocale.indexOf('ru') === 0) {
    const dateArray: number[] = dateL.split('.').map(Number);
    return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
  }
  const dateArray: number[] = dateL.split('/').map(Number);
  return new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
};
