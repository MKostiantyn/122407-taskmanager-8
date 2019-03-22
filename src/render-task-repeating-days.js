export const renderTaskRepeatingDays = (days = {}) => {
  const templateDay = (dayName, index, daysObject) => {
    const inputId = `repeat-${dayName}-${index}`;
    const inputChecked = daysObject[dayName] ? `checked` : ``;
    return `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="${inputId}" name="repeat" value="${dayName}" ${inputChecked}>
            <label class="card__repeat-day" for="${inputId}">${dayName}</label>`;
  };
  return Object.keys(days).reduce((accumulator, name, index) => accumulator + templateDay(name, index, days), ``);
};
