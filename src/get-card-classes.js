import isRepeated from './check-card-repeated';
import isOverDueDate from './check-card-overdue-date';
import getCardChosenClassName from './get-card-chosen-class-name';

export default (data) => {
  const cardChosenColorClassName = getCardChosenClassName(data.colorClassNames);
  const colorClass = cardChosenColorClassName ? ` card--${cardChosenColorClassName}` : ``;
  const repeatedClass = isRepeated(data.repeatDays) ? ` card--repeat` : ``;
  const dueDateClass = isOverDueDate(data.dueDate) ? ` card--deadline` : ``;
  return `card${colorClass}${repeatedClass}${dueDateClass}`;
};
