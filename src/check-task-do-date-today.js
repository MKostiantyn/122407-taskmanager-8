import {isRepeated} from './check-task-repeated';
import {isOverDueDate} from './check-task-overdue-date';

export const isDoDateToday = (dueDate, repeatDays) => {
  const isNotExistDueDateAndRepeatDays = !dueDate && !isRepeated(repeatDays);
  const isNotOverDueDate = !isOverDueDate(dueDate);
  const todayDayIndex = new Date().getDay();
  const todayDayName = Object.keys(repeatDays)[todayDayIndex ? todayDayIndex : Object.keys(repeatDays).length]
  const isRepeatDayToday = isRepeated(repeatDays) && repeatDays[todayDayName];
  return isNotExistDueDateAndRepeatDays || isNotOverDueDate || isRepeatDayToday;
};
