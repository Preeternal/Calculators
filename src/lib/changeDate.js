export const changeDate = (dateL: string): Date => {
  const dateArray = dateL.split('.');
  return (
    new Date(dateArray[2], (dateArray[1] - 1), dateArray[0])
  );
};
