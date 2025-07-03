export const getTasksFromStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : null;
};

export const saveTasksToStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};