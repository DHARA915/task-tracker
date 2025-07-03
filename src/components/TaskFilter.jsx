
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { motion } from 'framer-motion';

const TaskFilter = ({ darkMode }) => {
  const { filter, setFilter, allTasks, searchQuery, setSearchQuery } = useContext(TaskContext);

  const getTaskCount = (status) => {
    if (status === 'all') return allTasks.length;
    if (status === 'completed') return allTasks.filter(task => task.completed).length;
    return allTasks.filter(task => !task.completed).length;
  };

  return (
    <motion.div 
      className={`space-y-4 p-6 rounded-xl shadow-lg ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-700 text-white' 
          : 'bg-gradient-to-br from-amber-50 to-white text-gray-900'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className={`w-full px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 ${
            darkMode
              ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 focus:ring-blue-400 text-gray-900 placeholder-gray-500'
          } border transition-all duration-200`}
        />
        <div className={`absolute left-3 top-2.5 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-gradient-to-br from-pink-500 to-blue-600 text-white shadow-md' 
              : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All ({getTaskCount('all')})
        </motion.button>
        
        <motion.button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            filter === 'pending' 
              ? 'bg-gradient-to-br from-pink-500 to-blue-600 text-white shadow-md' 
              : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Pending ({getTaskCount('pending')})
        </motion.button>
        
        <motion.button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            filter === 'completed' 
              ? 'bg-gradient-to-br from-pink-500 to-blue-600 text-white shadow-md' 
              : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Completed ({getTaskCount('completed')})
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TaskFilter;