//@flow
export const daysString = (days:number) => {
  let dni : string;
  const daysInString = days.toString();
  const simvol = Number(daysInString.charAt(daysInString.length - 1));
  const simvol2 = Number(daysInString.charAt(daysInString.length - 2));
  if 	((simvol === 0) && (daysInString.length === 1)) {
    dni = '';
    //days = '';
  } else if ((simvol === 1) && (simvol2 !== 1)) {
    dni = ' день';
  } else if ((simvol <= 4) && (simvol !== 0) && (simvol !== 1) && (simvol2 !== 1)) {
    dni = ' дня';
  } else if ((simvol > 4) || (simvol2 === 1) || (simvol === 0)) {
    dni = ' дней';
  }
  return dni;
};
