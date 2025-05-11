import styled from 'styled-components';
import React from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { useState } from 'react';

const AddTaskBlock = styled.form`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-content: center;
`;

const AddTaskInput = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	flex-grow: 1;
	font-size: var(--fs-md);
	height: 38px;
`;

const DeadlineInput = styled.input`
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: var(--fs-sm);
	font-weight: light;
	height: 38px;
	min-width: 160px;
`;

export const AddTask = ({ onAddTask }) => {
	const [taskTitle, setTaskTitle] = useState('');
	const [deadline, setDeadline] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskTitle.trim()) {
			onAddTask(taskTitle, deadline);
			setTaskTitle('');
			setDeadline('');
		}
	};

	return (
		<AddTaskBlock onSubmit={handleSubmit}>
			<AddTaskInput
				type="text"
				value={taskTitle}
				onChange={(e) => setTaskTitle(e.target.value)}
				placeholder="Введите задачу..."
			/>
			<DeadlineInput
				type="datetime-local"
				value={deadline}
				onChange={(e) => setDeadline(e.target.value)}
			/>
			<IoAddCircle
				size="27px"
				onClick={handleSubmit}
				style={{ margin: 'auto' }}
			/>
		</AddTaskBlock>
	);
};
