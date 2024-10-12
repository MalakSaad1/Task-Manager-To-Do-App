import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const taskList = document.getElementById('task-list');
    taskList.addEventListener('click', (e) => {
      if (e.target.type === 'checkbox') {
        e.target.parentNode.classList.toggle('completed');
      } else if (e.target.classList.contains('delete-task')) {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
      } else if (e.target.classList.contains('edit-task')) {
        const taskItem = e.target.parentNode.parentNode;
        const taskText = taskItem.querySelector('a').textContent;
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText;
        taskItem.querySelector('a').textContent = '';
        taskItem.querySelector('a').appendChild(editInput);
        editInput.addEventListener('blur', () => {
          const newTaskText = editInput.value;
          taskItem.querySelector('a').textContent = newTaskText;
          editInput.remove();
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        const focusedTask = document.activeElement.parentNode;
        focusedTask.classList.toggle('completed');
      } else if (e.key === 'Delete') {
        const selectedTask = document.querySelector('.selected');
        if (selectedTask) {
          taskList.removeChild(selectedTask);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const taskItems = taskList.children;
        let selectedIndex = Array.prototype.indexOf.call(taskItems, selectedTask);
        if (e.key === 'ArrowUp' && selectedIndex > 0) {
          selectedIndex--;
        } else if (e.key === 'ArrowDown' && selectedIndex < taskItems.length - 1) {
          selectedIndex++;
        }
        if (selectedTask) {
          selectedTask.classList.remove('selected');
        }
        taskItems[selectedIndex].classList.add('selected');
        setSelectedTask(taskItems[selectedIndex]);
      } else if (e.key === 'Enter') {
        const selectedTask = document.querySelector('.selected');
        if (selectedTask) {
          const taskText = selectedTask.querySelector('a').textContent;
          const editInput = document.createElement('input');
          editInput.type = 'text';
          editInput.value = taskText;
          selectedTask.querySelector('a').textContent = '';
          selectedTask.querySelector('a').appendChild(editInput);
          editInput.addEventListener('blur', () => {
            const newTaskText = editInput.value;
            selectedTask.querySelector('a').textContent = newTaskText;
            editInput.remove();
          });
        }
      }
    });
  }, []);

  const addTask = (taskValue) => {
    if (taskValue) {
      const newTask = document.createElement('li');
      newTask.innerHTML = `
        <a href="#">${taskValue}</a>
        <input type="checkbox" id="task-${tasks.length + 1}">
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
      `;
      taskList.appendChild(newTask);
      setTasks([...tasks, newTask]);
    }
  };

  const handleAddTask = () => {
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();
    addTask(taskValue);
    taskInput.value = '';
  };

  const handleFilterTasks = (filterType) => {
    const taskItems = taskList.children;
    taskItems.forEach((task) => {
      if (filterType === 'all') {
        task.style.display = 'block';
      } else if (filterType === 'active') {
        if (!task.querySelector('input[type="checkbox"]').checked) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      } else if (filterType === 'completed') {
        if (task.querySelector('input[type="checkbox"]').checked) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      }
    });
  };

  return (
    <div>
      <input id="task-input" type="text" />
      <button id="add-task-btn" onClick={handleAddTask}>Add Task</button>
      <ul id="task-list">
        {tasks.map((task, index ) => (
          <li key={index}>
            <a href="#">{task.querySelector('a').textContent}</a>
            <input type="checkbox" id={`task-${index + 1}`} />
            <button className="edit-task">Edit</button>
            <button className="delete-task">Delete</button>
          </li>
        ))}
      </ul>  
    </div>
  );
}