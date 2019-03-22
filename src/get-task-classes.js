import {isRepeated} from './check-task-repeated';
import {isOverDueDate} from './check-task-overdue-date';

export const getTaskClasses = (className, repeatingDays, dueDate) => {
  const colorClass = className ? ` card--${className}` : ``;
  const repeatedClass = isRepeated(repeatingDays) ? ` card--repeat` : ``;
  const dueDateClass = isOverDueDate(dueDate) ? ` card--deadline` : ``;
  return `card${colorClass}${repeatedClass}${dueDateClass}`;
};
