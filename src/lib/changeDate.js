//@flow
export const changeDate = (dateL: string): Date => {
  const dateArray: number[] = dateL.split('.').map(Number);
  return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
};
