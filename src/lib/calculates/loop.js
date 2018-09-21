export const sumRange = (start, end, acc) => {
  if (start > end) {
    return acc;
  }
  return sumRange(start + 1, end, acc + start);
};
// console.log(sumRange(1, 10, 0)); // выводит 55
