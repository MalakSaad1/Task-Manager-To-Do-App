import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Scary 2 Animals', completed: false, url: 'https://www.deepseaworld.com/blog/scary-animals-myths-debunked/' },
    { id: 2, title: 'Must-Know Pufferfish Facts', completed: false, url: 'https://www.deepseaworld.com/animal-behaviour/must-know-pufferfish-facts/' },
    { id: 3, title: 'Meet the Sand Tiger Shark', completed: false, url: 'https://www.deepseaworld.com/shark/meet-the-sand-tiger-shark/' },
  ]);

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <a href="${task.url}" target="_blank">${task.title}</a>
        <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleTaskFilter = (filterType) => {
    const filteredTasks = tasks.filter((task) => {
      if (filterType === 'all') return true;
      if (filterType === 'active') return !task.completed;
      if (filterType === 'completed') return task.completed;
    });
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    filteredTasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <a href="${task.url}" target="_blank">${task.title}</a>
        <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
      `;
      taskList.appendChild(taskElement);
    });
  };

  return (
    <div>
      <h2>Tasks:</h2>
      <ul id="task-list"></ul>
      <input id="task-input" type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." />
      <button id="add-task-btn" onClick={handleAddTask}>Add Task</button>
      <div id="task-filters">
        <button id="all-tasks-btn" onClick={() => handleTaskFilter('all')}>All Tasks</button>
        <button id="active-tasks-btn" onClick={() => handleTaskFilter('active')}>Active Tasks</button>
        <button id="completed-tasks-btn" onClick={() => handleTaskFilter('completed')}>Completed Tasks</button>
      </div>
    </div>
  );
}

export default App