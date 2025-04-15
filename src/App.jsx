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
		if (savedTasks) setTasks(savedTasks);
	}, []);

	// Сохранение задач в localStorage
	useEffect(() => {
		localStorage.setItem(tasks, JSON.stringify(tasks));
	}, [tasks]);

	//   Добавление задачи в список
	const handleAddTask = (taskTitle) => {
		const newTask = {
			id: Date.now(),
			text: taskTitle,
			createdAt: new Date().toLocaleString('ru-RU'),
			completed: false,
		};
		setTasks([...tasks, newTask]);
	};

	// Удаление задачи из списка
	const handleDeleteTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	// Изменение статуса задачи
	const toggleTaskStatus = (taskId) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	// Сортировка задач
	const sortedTasks = [...tasks].sort((a, b) => {
		if (a.completed && !b.completed) return 1;
		if (!a.completed && b.completed) return -1;
		return 0;
	});

	//   Фильтрация задач
	const filteredTasks = sortedTasks.filter((task) => {
		if (filter === 'active') return !task.completed;
		if (filter === 'completed') return task.completed;
		return true;
	});

	return (
		<>
			<Header
				onAddTask={handleAddTask}
				allCount={tasks.length}
				activeCount={tasks.filter((task) => !task.completed).length}
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
