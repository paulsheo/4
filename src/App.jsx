import React, { useState } from 'react';
import './index.css';


const Task = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span style={{ marginLeft: '10px', textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)}>
        Remove
      </button>
    </div>
  );
};


const TaskForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      addTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Daily Planner</h1>
      <h2>You have Tasks Remaining: {tasks.length - completedCount}</h2>
      <TaskForm addTask={addTask} />
      <div>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;