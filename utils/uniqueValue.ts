export const uniquesValue = (arr) => {
  const set = new Set(arr);
  const uniqueValueArr = Array.from(set);
  return uniqueValueArr;
};
