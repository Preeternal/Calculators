export const initDate = (dateL) => {
    //const date = dateL;
    const DD = dateL.getDate() < 10 ? '0' : 0;
    const MM = dateL.getMonth() < 9 ? '0' : 0;
    return (
      `${DD + dateL.getDate()}.${MM + (dateL.getMonth() + 1)}.${dateL.getFullYear()}`
    );
};
