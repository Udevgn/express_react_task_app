const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module

const app = express();
const PORT = 3001;

// In-memory data store for tasks
let tasks = [];

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// CRUD operations
app.get('/tasks', (req, res) => {
    console.log('tasks returned!!!')
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? updatedTask : task));
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  console.log(typeof(taskId)+"--"+typeof(tasks[0].id))
  tasks = tasks.filter(task => task.id !== taskId);
  console.log(tasks);
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
