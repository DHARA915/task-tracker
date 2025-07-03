

// import { useState, useContext } from 'react';
// import { TaskContext } from '../context/TaskContext';
// import { motion } from 'framer-motion';
// import { 
//   CheckIcon, 
//   PencilIcon, 
//   TrashIcon,
//   FlagIcon,
//   CalendarIcon,
//   TagIcon 
// } from '@heroicons/react/24/outline';

// const TaskList = () => {
//   const { tasks, deleteTask, updateTask, toggleTaskCompletion } = useContext(TaskContext);
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [editedTask, setEditedTask] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     dueDate: '',
//     category: ''
//   });

//   const priorityColors = {
//     high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
//     medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
//     low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//   };

//   const handleDelete = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       deleteTask(taskId);
//     }
//   };

//   const startEditing = (task) => {
//     setEditingTaskId(task.id);
//     setEditedTask({
//       title: task.title,
//       description: task.description || '',
//       priority: task.priority || 'medium',
//       dueDate: task.dueDate || '',
//       category: task.category || ''
//     });
//   };

//   const cancelEditing = () => {
//     setEditingTaskId(null);
//   };

//   const saveEdit = (taskId) => {
//     updateTask(taskId, editedTask);
//     setEditingTaskId(null);
//   };

//   const handleToggleComplete = (taskId) => {
//     toggleTaskCompletion(taskId);
//   };

//   if (!tasks) {
//     return (
//       <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//         Loading tasks...
//       </div>
//     );
//   }

//   return (
//     <motion.div 
//       className="space-y-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       {tasks.length === 0 ? (
//         <motion.div 
//           className="text-center py-8 text-gray-500 dark:text-gray-400"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           No tasks found. Add a new task to get started!
//         </motion.div>
//       ) : (
//         <motion.ul className="space-y-4">
//           {tasks.map(task => (
//             <motion.li
//               key={task.id}
//               className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${
//                 task.completed ? 'opacity-80 border-l-4 border-green-500' : ''
//               }`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               {editingTaskId === task.id ? (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Title*
//                       </label>
//                       <input
//                         type="text"
//                         value={editedTask.title}
//                         onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Priority
//                       </label>
//                       <select
//                         value={editedTask.priority}
//                         onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                       >
//                         <option value="high">High</option>
//                         <option value="medium">Medium</option>
//                         <option value="low">Low</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Due Date
//                       </label>
//                       <input
//                         type="date"
//                         value={editedTask.dueDate}
//                         onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Category
//                       </label>
//                       <input
//                         type="text"
//                         value={editedTask.category}
//                         onChange={(e) => setEditedTask({...editedTask, category: e.target.value})}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                         placeholder="General"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                       Description
//                     </label>
//                     <textarea
//                       value={editedTask.description}
//                       onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
//                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//                       rows={3}
//                     />
//                   </div>

//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => saveEdit(task.id)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-start">
//                   {/* Checkbox for completion status */}
//                   <button
//                     onClick={() => handleToggleComplete(task.id)}
//                     className={`flex-shrink-0 w-5 h-5 mt-1 mr-3 rounded border-2 flex items-center justify-center ${
//                       task.completed
//                         ? 'bg-green-500 border-green-500 text-white'
//                         : 'border-gray-300 dark:border-gray-600'
//                     }`}
//                   >
//                     {task.completed && <CheckIcon className="w-3 h-3" />}
//                   </button>
                  
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className={`text-lg font-medium dark:text-white ${
//                           task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
//                         }`}>
//                           {task.title}
//                         </h3>
//                         {task.description && (
//                           <p className={`text-gray-600 dark:text-gray-300 mt-1 ${
//                             task.completed ? 'line-through' : ''
//                           }`}>
//                             {task.description}
//                           </p>
//                         )}
//                       </div>
                      
//                       <div className="flex space-x-2 ml-2">
//                         <button
//                           onClick={() => startEditing(task)}
//                           className="p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition"
//                           title="Edit"
//                         >
//                           <PencilIcon className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(task.id)}
//                           className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
//                           title="Delete"
//                         >
//                           <TrashIcon className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mt-3">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         priorityColors[task.priority || 'medium']
//                       }`}>
//                         <FlagIcon className="w-3 h-3 mr-1" />
//                         {task.priority || 'medium'}
//                       </span>
                      
//                       {task.dueDate && (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
//                           <CalendarIcon className="w-3 h-3 mr-1" />
//                           {new Date(task.dueDate).toLocaleDateString()}
//                         </span>
//                       )}
                      
//                       {task.category && (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
//                           <TagIcon className="w-3 h-3 mr-1" />
//                           {task.category}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.li>
//           ))}
//         </motion.ul>
//       )}
//     </motion.div>
//   );
// };

// export default TaskList;

import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  PencilIcon, 
  TrashIcon,
  FlagIcon,
  CalendarIcon,
  TagIcon 
} from '@heroicons/react/24/outline';

const TaskList = ({ darkMode }) => {
  const { tasks, deleteTask, updateTask, toggleTaskCompletion } = useContext(TaskContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: ''
  });

  const priorityColors = {
    high: `${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`,
    medium: `${darkMode ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800'}`,
    low: `${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || '',
      category: task.category || ''
    });
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const saveEdit = (taskId) => {
    updateTask(taskId, editedTask);
    setEditingTaskId(null);
  };

  const handleToggleComplete = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  if (!tasks) {
    return (
      <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Loading tasks...
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {tasks.length === 0 ? (
        <motion.div 
          className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No tasks found. Add a new task to get started!
        </motion.div>
      ) : (
        <motion.ul className="space-y-4">
          {tasks.map(task => (
            <motion.li
              key={task.id}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 ${
                task.completed ? 'opacity-80 border-l-4 border-green-500' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {editingTaskId === task.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Title*
                      </label>
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white'
                            : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
                        } border transition-all duration-200`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Priority
                      </label>
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white'
                            : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
                        } border transition-all duration-200`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white'
                            : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
                        } border transition-all duration-200`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Category
                      </label>
                      <input
                        type="text"
                        value={editedTask.category}
                        onChange={(e) => setEditedTask({...editedTask, category: e.target.value})}
                        className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white'
                            : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
                        } border transition-all duration-200`}
                        placeholder="General"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description
                    </label>
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                      className={`w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white'
                          : 'bg-white border-gray-300 focus:ring-amber-400 text-gray-900'
                      } border transition-all duration-200`}
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => saveEdit(task.id)}
                      className={`px-3 py-1 rounded transition-all duration-300 ${
                        darkMode
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Changes
                    </motion.button>
                    <motion.button
                      onClick={cancelEditing}
                      className={`px-3 py-1 rounded transition-all duration-300 ${
                        darkMode
                          ? 'bg-gray-600 hover:bg-gray-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  {/* Checkbox for completion status */}
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className={`flex-shrink-0 w-5 h-5 mt-1 mr-3 rounded border-2 flex items-center justify-center ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
                    }`}
                  >
                    {task.completed && <CheckIcon className="w-3 h-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-lg font-medium ${
                          task.completed 
                            ? `line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`
                            : darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`mt-1 ${
                            task.completed ? 'line-through' : ''
                          } ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-2">
                        <button
                          onClick={() => startEditing(task)}
                          className={`p-1 transition ${
                            darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-400 hover:text-indigo-300'
                          }`}
                          title="Edit"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className={`p-1 transition ${
                            darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                          }`}
                          title="Delete"
                        >
                          <TrashIcon className="w-5 h-5 " />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        priorityColors[task.priority || 'medium']
                      }`}>
                        <FlagIcon className="w-3 h-3 mr-1" />
                        {task.priority || 'medium'}
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
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default TaskList;