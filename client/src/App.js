import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles.css';

const API_URL = 'http://localhost:3001/tasks';
const Home = () => <h1>Welcome to the Task Management App!</h1>;
const { v4: uuidv4 } = require('uuid');

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = () => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    axios.post(API_URL, { name: newTask,id: uuidv4()})
      .then(response => setTasks([...tasks, response.data]))
      .then(response => console.log(response.data+'posted'))
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        console.log('after deleting ${id}')
        fetchTasks()
      })
      .catch(error => console.error('Error deleting task:', error));
  };
  

  return (
    <div>
      <h1>Task Management</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskManagement />} />
      </Routes>
    </div>
  </Router>
);

export default App;
