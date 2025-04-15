import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Загрузка и сохранение задач
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      createdAt: new Date().toLocaleString('ru-RU'),
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Container>
      <Header onAddTask={handleAddTask} />
      <TaskList 
        tasks={filteredTasks} 
        onDeleteTask={handleDeleteTask}
        onToggleCompletion={toggleTaskCompletion} 
      />
      <TaskFilter
        activeFilter={filter}
        onFilterChange={setFilter}
        activeCount={tasks.filter(task => !task.completed).length}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export default App;