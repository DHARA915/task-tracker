import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<TaskDashboard />} />
          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;