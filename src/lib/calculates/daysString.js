export const daysString = (days) => {
  let dni;
  const daysInString = days.toString();
  const simvol = parseInt(daysInString.charAt(daysInString.length - 1), 10);
  const simvol2 = parseInt(daysInString.charAt(daysInString.length - 2), 10);
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
