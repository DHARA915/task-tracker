import { createContext, useState, useEffect, useCallback } from 'react';
import { getTasksFromStorage, saveTasksToStorage } from '../utils';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedTasks = getTasksFromStorage();
      setTasks(storedTasks || []);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks !== null) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  // Define all task manipulation functions
  const addTask = useCallback((task) => {
    setTasks(prevTasks => [
      ...(prevTasks || []),
      {
        ...task,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: task.priority || 'medium',
        dueDate: task.dueDate || null,
        category: task.category || 'general'
      }
    ]);
  }, []);

  const updateTask = useCallback((id, updatedTask) => {
    setTasks(prevTasks => 
      (prevTasks || []).map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => (prevTasks || []).filter(task => task.id !== id));
  }, []);

  const toggleTaskCompletion = useCallback((id) => {
    setTasks(prevTasks => 
      (prevTasks || []).map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Filter tasks based on current filter and search query
  const filteredTasks = tasks 
    ? tasks.filter(task => {
        if (filter === 'completed' && !task.completed) return false;
        if (filter === 'pending' && task.completed) return false;
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          (task.description && task.description.toLowerCase().includes(query)) ||
          (task.category && task.category.toLowerCase().includes(query))
        );
      })
    : null;

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      allTasks: tasks || [],
      filter,
      setFilter,
      searchQuery,
      setSearchQuery,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion
    }}>
      {children}
    </TaskContext.Provider>
  );
};