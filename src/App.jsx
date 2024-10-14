import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Scary 2 Animals', completed: false, url: 'https://www.deepseaworld.com/blog/scary-animals-myths-debunked/' },
    { id: 2, title: 'Must-Know Pufferfish Facts', completed: false, url: 'https://www.deepseaworld.com/animal-behaviour/must-know-pufferfish-facts/' },
    { id: 3, title: 'Meet the Sand Tiger Shark', completed: false, url: 'https://www.deepseaworld.com/shark/meet-the-sand-tiger-shark/' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const taskElement = document.createElement('li');
      if (editingTask === task.id) {
        taskElement.innerHTML = `
          <input type="text" value="${editedTask}" onChange={(e) => setEditedTask(e.target.value)}>
          <button class="save-task" data-task-id="${task.id}">Save</button>
          <button class="cancel-task" data-task-id="${task.id}">Cancel</button>
        `;
      } else {
        taskElement.innerHTML = `
          <a href="${task.url}" target="_blank">${task.title}</a>
          <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
          <button class="edit-task" data-task-id="${task.id}">Edit</button>
          <button class="delete-task" data-task-id="${task.id}">Delete</button>
        `;
      }
      taskList.appendChild(taskElement);
    });

    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        handleDeleteTask(taskId);
      });
    });

    const editButtons = document.querySelectorAll('.edit-task');
    editButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        handleEditTask(taskId);
      });
    });

    const saveButtons = document.querySelectorAll('.save-task');
    saveButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        handleSaveTask(taskId);
      });
    });

    const cancelButtons = document.querySelectorAll('.cancel-task');
    cancelButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        handleCancelTask(taskId);
      });
    });
  }, [tasks, editingTask, editedTask]);

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
      if (editingTask === task.id) {
        taskElement.innerHTML = `
          <input type="text" value="${editedTask}" onChange={(e) => setEditedTask(e.target.value)}>
          <button class="save-task" data-task-id="${task.id}">Save</button>
          <button class="cancel-task" data-task-id="${task.id}">Cancel</button>
        `;
      } else {
        taskElement.innerHTML = `
          <a href="${task.url}" target="_blank">${task.title}</a>
          <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
          <button class="edit-task" data-task-id="${task.id}">Edit</button>
          <button class="delete-task" data-task-id="${task.id}">Delete</button>
        `;
      }
      taskList.appendChild(taskElement);
    });

    const deleteButtons =