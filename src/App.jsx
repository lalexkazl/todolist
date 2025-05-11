import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskFilter } from './components/TaskFilter';
import React, { useState, useEffect } from 'react';

function App() {
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState('All');

	// Загрузка задач из localStorage
	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem('tasks'));
		if (savedTasks) {
			setTasks(savedTasks);
		} else {
			localStorage.setItem('tasks', JSON.stringify([]));
			setTasks([]);
		}
	}, []);

	//   Добавление задачи в список
	const handleAddTask = (taskTitle, deadline) => {
		const newTask = {
			id: Date.now(),
			text: taskTitle,
			createdAt: new Date().toLocaleString('ru-RU'),
			deadline: deadline || null,
			completed: false,
		};
		let local = [...tasks, newTask];
		setTasks(local);
		localStorage.setItem('tasks', JSON.stringify(local));
	};

	// Удаление задачи из списка
	const handleDeleteTask = (taskId) => {
		let local = tasks.filter((task) => task.id !== taskId);
		setTasks(local);
		localStorage.setItem('tasks', JSON.stringify(local));
	};

	// Изменение статуса задачи
	const toggleTaskStatus = (taskId) => {
		let local = tasks.map((task) =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		);
		setTasks(local);
		localStorage.setItem('tasks', JSON.stringify(local));
	};
	// Проверка срока задачи
	const isTaskOverdue = (task) => {
		return !task.completed && 
			   task.deadline && 
			   new Date(task.deadline) < new Date() &&
			   !isNaN(new Date(task.deadline).getTime());
	  };
	// Сортировка задач
	const sortedTasks = [...tasks].sort((a, b) => {
		if (a.completed && !b.completed) return 1;
		if (!a.completed && b.completed) return -1;
		if (a.deadline && b.deadline) {
			return new Date(a.deadline) - new Date(b.deadline);
		}
		if (a.deadline) return -1;
		if (b.deadline) return 1;
		return 0;
	});

	//   Фильтрация задач
	const filteredTasks = sortedTasks.filter((task) => {
		if (filter === 'active') return !task.completed;
		if (filter === 'completed') return task.completed;
		if (filter === 'overdue') return isTaskOverdue(task);
		return true;
	});

	return (
		<>
			<Header
				onAddTask={handleAddTask}
				allCount={tasks.length}
				activeCount={tasks.filter((task) => !task.completed).length}
				completedCount={tasks.filter((task) => task.completed).length}
				overdueCount={tasks.filter(isTaskOverdue).length}
			/>
			<TaskFilter activeFilter={filter} onFilterChange={setFilter} />
			<TaskList
				tasks={filteredTasks}
				onDeleteTask={handleDeleteTask}
				onToggleStatus={toggleTaskStatus}
			/>
		</>
	);
}

export default App;
