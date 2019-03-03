import renderCard from './render-card';

export default (cardsArray) => cardsArray && cardsArray.length ? cardsArray.reduce((currentValue, currentElement, currentIndex) => currentValue + renderCard(currentElement, currentIndex), ``) : ``;
