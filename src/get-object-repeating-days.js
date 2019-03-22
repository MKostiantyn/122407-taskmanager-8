export const getObjectRepeatingDays = (days = []) => {
  return days.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = Math.random() > 0.7;
    return accumulator;
  }, {});
};
