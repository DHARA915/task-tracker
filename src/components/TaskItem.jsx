import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CheckIcon, 
  PencilIcon, 
  TrashIcon,
  FlagIcon,
  CalendarIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task, darkMode }) => {
  const { toggleTaskCompletion, deleteTask, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  
  const priorityColors = {
    high: darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
    medium: darkMode ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800',
    low: darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
  };

  const handleToggle = () => {
    toggleTaskCompletion(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
  };

  return (
    <motion.li
      layout
      className={`rounded-xl shadow-md p-4 mb-4 ${
        darkMode 
          ? task.completed 
            ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-l-4 border-green-400'
            : 'bg-gray-800'
          : task.completed 
            ? 'bg-gradient-to-r from-green-50 to-amber-50 border-l-4 border-green-400'
            : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
            } border transition-all duration-200`}
          />
          
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
            } border transition-all duration-200`}
            rows={3}
          />
          
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
            } border transition-all duration-200`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <div className="flex space-x-2">
            <motion.button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save
            </motion.button>
            <motion.button
              onClick={handleCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 py-2 px-4 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={handleToggle}
              className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-1 ${
                task.completed 
                  ? 'bg-green-500 text-white' 
                  : darkMode 
                    ? 'border-2 border-gray-600' 
                    : 'border-2 border-gray-300'
              }`}
            >
              {task.completed && <CheckIcon className="w-4 h-4" />}
            </button>
            
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                task.completed ? 'line-through' : ''
              } ${
                darkMode 
                  ? task.completed 
                    ? 'text-gray-400' 
                    : 'text-amber-100'
                  : task.completed 
                    ? 'text-gray-500' 
                    : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  priorityColors[task.priority]
                }`}>
                  <FlagIcon className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
                
                {task.dueDate && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}>
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                
                {task.category && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                  }`}>
                    <TagIcon className="w-3 h-3 mr-1" />
                    {task.category}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-2">
            <motion.button
              onClick={handleEdit}
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <PencilIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TrashIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.li>
  );
};

export default TaskItem;