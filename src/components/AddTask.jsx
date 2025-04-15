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
	font-size: 16px;
	height: 38px;
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: #fff;
	color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.2s;

	&:hover {
		background-color: #e6f2ff;
	}
`;

export const AddTask = ({ onAddTask }) => {
	const [taskTitle, setTaskTitle] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskTitle.trim()) {
			onAddTask(taskTitle);
			setTaskTitle('');
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
			<IoAddCircle size="27px" onClick={handleSubmit} style={{ margin: 'auto' }} />

		</AddTaskBlock>
	);
};
