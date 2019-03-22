import {renderTask} from './render-task';
export const renderTasks = (tasks = []) => tasks.reduce((accumulator, data) => accumulator + renderTask(data), ``);
