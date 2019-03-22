export const renderTaskDueDay = (milliseconds) => {
  let date = ``;
  let time = ``;
  if (milliseconds && !isNaN(milliseconds)) {
    const dayObject = new Date(milliseconds);
    const hours = dayObject.getHours();
    const month = dayObject.toLocaleString(`en-us`, {month: `long`});
    date = `${dayObject.getDate()} ${month}`;
    time = `${hours % 12 ? hours % 12 : 12}:${dayObject.getMinutes()} ${hours >= 12 ? `PM` : `AM`}`;
  }
  return `<label class="card__input-deadline-wrap"><input class="card__date" type="text" placeholder="${date}" name="date" value="${date}"></label>
          <label class="card__input-deadline-wrap"><input class="card__time" type="text" placeholder="${time}" name="time" value="${time}"></label>`;
};
