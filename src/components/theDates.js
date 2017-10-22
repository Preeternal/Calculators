const initDate = () => {
  const today = new Date();
  let DD = 0;
  if (today.getDate() < 10) { DD = '0'; }
  let MM = 0;
  if (today.getMonth() < 9) { MM = '0'; }
  const theDate2 = `${DD + today.getDate()}.${MM + (today.getMonth()+1)}.${today.getFullYear()}`;
};


// document.forms["loandata"].theDate2.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + today.getFullYear();
// document.forms["loandata"].theDate.value = (DD + today.getDate()) + "." + (MM + (today.getMonth()+1)) + "." + (today.getFullYear()+1);
// }

initDate();

export default initDate();
