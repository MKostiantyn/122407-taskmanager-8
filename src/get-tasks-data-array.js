import {getTaskData} from './get-task-data';
export const getTasksDataArray = (quantity) => [...new Array(quantity)].map(() => getTaskData());
