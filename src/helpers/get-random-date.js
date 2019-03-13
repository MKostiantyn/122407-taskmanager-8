export default () => {
  const randomDayMilliseconds = Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
  const randomDayWithSign = Math.random() > 0.5 ? -randomDayMilliseconds : randomDayMilliseconds;
  return Date.now() + randomDayWithSign;
};
