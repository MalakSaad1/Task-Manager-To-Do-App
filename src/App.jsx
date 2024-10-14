import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Scary 2 Animals', completed: false, url: 'https://www.deepseaworld.com/blog/scary-animals-myths-debunked/' },
    { id: 2, title: 'Must-Know Pufferfish Facts', completed: false, url: 'https://www.deepseaworld.com/animal-behaviour/must-know-pufferfish-facts/' },
    { id: 3, title: 'Meet the Sand Tiger Shark', completed: false, url: 'https://www.deepseaworld.com/shark/meet-the-sand-tiger-shark/' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTaskId(taskId);
    setEditedTask(taskToEdit.title);
  };

  const handleSaveTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, title: editedTask } : task
    ));
    setEditingTaskId(null);
    setEditedTask('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h2>Tasks:</h2>
      <ul id="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input 
                  type="text" 
                  value={editedTask} 
                  onChange={(e) => setEditedTask(e.target.value)} 
                />
                <button onClick={() => handleSaveTask(task.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <a href={task.url} target="_blank" rel="noopener noreferrer">{task.title}</a>
                <input type="checkbox" id={`task-${task.id}`} checked={task.completed} readOnly />
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Add a new task..." 
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default App;