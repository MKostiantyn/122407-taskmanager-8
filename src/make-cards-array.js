import getCardData from './get-card-data';
export default (quantityCards) => [...new Array(quantityCards)].map(() => getCardData());
