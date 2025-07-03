import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-between w-16 h-8 rounded-full p-1 ${
        darkMode ? 'bg-indigo-900' : 'bg-slate-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          darkMode ? 'bg-slate-200' : 'bg-indigo-900'
        }`}
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {darkMode ? (
          <SunIcon className="w-4 h-4 text-indigo-900" />
        ) : (
          <MoonIcon className="w-4 h-4 text-slate-200" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;