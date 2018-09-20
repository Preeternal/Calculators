//@flow
import { strings } from '../../../locales/i18n';
export const daysString = (days: number): string => {
  let dni;
  const daysInString = days.toString();
  const simvol = Number(daysInString.charAt(daysInString.length - 1));
  const simvol2 = Number(daysInString.charAt(daysInString.length - 2));
  if (simvol === 0 && daysInString.length === 1) {
    dni = '';
  } else if (simvol === 1 && simvol2 !== 1) {
    //dni = 'день';
    dni = strings('result.srok.dni.dni1');
  } else if (simvol <= 4 && simvol !== 0 && simvol !== 1 && simvol2 !== 1) {
    // dni = 'дня';
    dni = strings('result.srok.dni.dni2');
  } else if (simvol > 4 || simvol2 === 1 || simvol === 0) {
    //dni = 'дней';
    dni = strings('result.srok.dni.dni3');
  } else {
    dni = '';
  }
  return dni;
};
