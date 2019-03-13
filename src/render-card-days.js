export default (objectDays = {}, cardIndex = 0) => {
  const templateDay = (dayName, index, object) => {
    const inputId = `repeat-${dayName}-${index}`;
    const inputChecked = object[dayName] ? `checked` : ``;
    return `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="${inputId}" name="repeat" value="${dayName}" ${inputChecked}>
            <label class="card__repeat-day" for="${inputId}">${dayName}</label>`;
  };
  return Object.keys(objectDays).reduce((accumulator, name) => accumulator + templateDay(name, cardIndex, objectDays), ``);
};
