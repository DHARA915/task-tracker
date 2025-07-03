import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import TaskForm from './TakForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import ThemeToggle from './ThemeToggle';

const TaskDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem('username');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode
      ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-amber-100'
      : 'bg-gradient-to-br from-amber-50 to-green-50 text-gray-900'
      }`}>
      <header className={`transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold  bg-gradient-to-br from-pink-500 to-blue-600 bg-clip-text text-transparent">  Welcome, {username}!</h1>
          <div className='flex items-center'>
            <ThemeToggle />
            {/* logout */}
            <motion.button
              className="ml-4 px-4 py-2 bg-gradient-to-br from-pink-500 to-blue-700 hover:from-pink-700 hover:to-blue-900 text-white rounded-lg  group-hover:bg-red-600 transition-colors duration-300"
              onClick={() => {
                localStorage.removeItem('username');
                window.location.href = '/'; // Redirect to login page
              }}

            >
              Logout
            </motion.button>

          </div>


        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          <TaskForm darkMode={darkMode} />
          <TaskFilter darkMode={darkMode} />
          <TaskList darkMode={darkMode} />
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;