export default (dueDate) => dueDate && !isNaN(dueDate) ? Date.now() > dueDate : false;
