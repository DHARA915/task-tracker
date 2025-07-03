import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FlagIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

const TaskForm = ({ darkMode }) => {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        title,
        description,
        priority,
        dueDate: dueDate || null,
        category: category || 'general'
      });
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCategory('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`rounded-xl p-6 space-y-4 ${
        darkMode 
          ? 'bg-gray-700 text-amber-100' 
          : 'bg-white text-gray-900'
      } shadow-lg`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`text-lg font-medium ${
        darkMode ? 'text-amber-100' : 'text-gray-900'
      }`}>
        Add New Task
      </h3>

      {/* Title Field */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          darkMode ? 'text-amber-100' : 'text-gray-700'
        }`}>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (required)"
          required
          className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
              : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'
          } border transition-all duration-200`}
        />
      </div>

      {/* Description Field */}
      <div>
        <label className={`block text-sm font-medium mb-1 ${
          darkMode ? 'text-amber-100' : 'text-gray-700'
        }`}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows={3}
           className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
              : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'
          } border transition-all duration-200`}
        />
      </div>

      {/* Additional Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Priority Field */}
        <div>
          <label className={`flex items-center text-sm font-medium mb-1 ${
            darkMode ? 'text-amber-100' : 'text-gray-700'
          }`}>
            <FlagIcon className="w-4 h-4 mr-1" />
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'
            } border transition-all duration-200`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date Field */}
        <div>
          <label className={`flex items-center text-sm font-medium mb-1 ${
            darkMode ? 'text-amber-100' : 'text-gray-700'
          }`}>
            <CalendarIcon className="w-4 h-4 mr-1" />
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'
            } border transition-all duration-200`}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className={`flex items-center text-sm font-medium mb-1 ${
            darkMode ? 'text-amber-100' : 'text-gray-700'
          }`}>
            <TagIcon className="w-4 h-4 mr-1" />
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="General"
            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-600 border-gray-500 focus:ring-indigo-400 text-white'
                : 'bg-white border-gray-300 focus:ring-blue-400 text-gray-900'
            } border transition-all duration-200`}
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className={`w-full text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 bg-gradient-to-br from-pink-500 to-blue-700 hover:from-pink-700 hover:to-blue-900`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add Task
      </motion.button>
    </motion.form>
  );
};

export default TaskForm;