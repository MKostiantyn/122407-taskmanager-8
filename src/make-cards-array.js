import getCardData from './get-card-data.js';
export default (quantityCards) => [...new Array(quantityCards)].map(() => getCardData());
