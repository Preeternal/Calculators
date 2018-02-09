//@flow
export const initDate = (dateL: Date): string => {
  // declare class Intl$NumberFormat {
  //   constructor(locales: string | Array<string>, options?: Object): void;
  //   format(number: Number): string;
  // }
  // declare type IntlType = {
  //   NumberFormat: Class<Intl$NumberFormat>,
  // }
  // declare var Intl: typeof undefined | IntlType;

  // const formatter = new Intl.DateTimeFormat('ru');
  // console.log(formatter.format(dateL));
  const DD = dateL.getDate() < 10 ? '0' : 0;
  const MM = dateL.getMonth() < 9 ? '0' : 0;
  return `${DD + dateL.getDate()}.${MM + (dateL.getMonth() + 1)}.${dateL.getFullYear()}`;
};
