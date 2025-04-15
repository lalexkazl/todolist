import React from 'react';
import styled from 'styled-components';
// import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const List = styled.ul`
	list-style: none;
	padding: 0;
`;

const TaskItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border: 1px solid #ddd;
	margin-bottom: 5px;
	border-radius: 4px;
  background: ${props => props.completed ? '#f8f8f8' : '#fff'};
`;
const TaskContent = styled.div`
	display: grid;
	justify-content: start;
	align-items: center;
	grid-template-columns: 30% auto;
	padding: 2rem 0;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#888' : '#333'};
`;
const TaskContentEl = styled.span`
	position: relative;
  font-size: 16px;
  margin-bottom: 4px;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  color: ${props => props.$completed ? '#888' : '#333'};
`;

const Checkbox = styled.input`
	cursor: pointer;
	min-width: 18px;
	min-height: 18px;
`;

export const TaskList = ({ tasks, onDeleteTask, onToggleStatus }) => {
	return (
		<List>
			{tasks.map((task) => (
				<TaskItem key={task.id} $completed={task.completed}>
					<Checkbox
						type="checkbox"
						checked={task.completed}
						onChange={() => onToggleStatus(task.id)}
					/>
					<TaskContent>
						<TaskContentEl $completed={task.completed}>
							{task.text}
						</TaskContentEl>

						<TaskContentEl $completed={task.completed}>Создано: {task.createdAt}</TaskContentEl>
					</TaskContent>
					<IoCloseSharp onClick={() => onDeleteTask(task.id)} />
				</TaskItem>
			))}
		</List>
	);
};
