export default (objectData = {}) => {
  const controlButtons = [`Edit`, `Archive`, `Favorites`].reduce((accumulator, name, index) => {
    const controlNameClass = `card__btn card__btn--${name.toLowerCase()}`;
    const controlDisabledClassEdit = !index ? ` card__btn--disabled` : ``;
    const controlDisabledClassArchive = index === 1 && objectData.isDone ? ` card__btn--disabled` : ``;
    const controlDisabledClassFavorites = index === 2 && objectData.isFavorite ? ` card__btn--disabled` : ``;
    const completeClass = `${controlNameClass}${controlDisabledClassEdit}${controlDisabledClassArchive}${controlDisabledClassFavorites}`;
    return accumulator + `<button type="button" class="${completeClass}">${name}</button>`;
  }, ``);

  return `<div class="card__control">${controlButtons}</div>`;
};
