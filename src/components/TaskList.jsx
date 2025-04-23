import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TaskItem = styled.li`
	display: flex;
	align-items: center;
	padding: 0.8rem 3rem;
	border: 1px solid #ddd;
	margin-bottom: 0.5rem;
	border-radius: 4px;
	background: ${(props) => (props.$completed ? '#f8f8f8' : '#fff')};
	gap: 0.8rem;
	width: 99%;
	animation: ${fadeIn} 0.3s ease-out forwards;
	opacity: 0;
	transition: all 0.2s ease;
`;
const TaskContent = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	width: 100%;
	align-items: center;
	gap: 1rem;
	transition: all 0.2s ease;

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}
`;

const TaskText = styled.span`
	font-size: var(--fs-md);
	word-break: break-word;
	text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
	color: ${(props) => (props.$completed ? '#888' : '#333')};
	padding-right: 1rem;
	transition: all 0.2s ease;

	@media (max-width: 480px) {
		font-size: var(--fs-sm);
		padding-right: 0;
	}
`;

const TaskDate = styled.span`
	font-size: var(--fs-md);
	color: ${(props) => (props.$completed ? '#aaa' : '#666')};
	text-align: left;
	text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
	transition: all 0.2s ease;

	@media (max-width: 480px) {
		display: none;
	}
`;

const Checkbox = styled.input`
	cursor: pointer;
	min-width: 18px;
	min-height: 18px;
	margin-right: 0.5rem;
	transition: all 0.2s ease;

	@media (max-width: 480px) {
		min-width: 16px;
		min-height: 16px;
	}
`;

const DeleteButton = styled(IoCloseSharp)`
	cursor: pointer;
	color: var(--colors-text);
	flex-shrink: 0;
	margin-left: 0.5rem;
	transition: all 0.2s ease;

	@media (max-width: 768px) {
		margin-left: auto;
		margin-right: 0.5rem;
	}

	@media (max-width: 480px) {
		margin: 0.3rem 0 0 auto;
	}
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
						<TaskText $completed={task.completed}>
							{task.text}
						</TaskText>

						<TaskDate $completed={task.completed}>
							Создано: {task.createdAt}
						</TaskDate>
					</TaskContent>
					<DeleteButton
						size={20}
						onClick={() => onDeleteTask(task.id)}
					/>
				</TaskItem>
			))}
		</List>
	);
};
