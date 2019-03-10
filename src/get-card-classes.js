import isRepeated from './check-card-repeated';
import isDueDate from './check-card-due-date';
import getCardChosenClassName from './get-card-chosen-class-name';

export default (data) => {
  const cardChosenColorClassName = getCardChosenClassName(data.colorClassNames);
  return `card${cardChosenColorClassName ? ` card--${cardChosenColorClassName}` : ``}${isRepeated(data.repeatDays) ? ` card--repeat` : ``}${isDueDate(data.dueDate) ? ` card--deadline` : ``}`;
};
