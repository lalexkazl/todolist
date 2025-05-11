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
	width: 100%;
	margin: 0 auto;
`;

const TaskItem = styled.li`

	display: flex;
	align-items: flex-start;
	padding: 1rem;
	border: 1px solid var(--colors-ui-base);
	margin-bottom: 0.75rem;
	border-radius: var(--radii);
	background: ${(props) =>
		props.$completed ? '#f8f8f8' : '#fff'};
	gap: 1rem;
	width: 95%;
	animation: ${fadeIn} 0.3s ease-out forwards;
	opacity: 0;
	transition: all 0.2s ease;
	position: relative;
	${(props) =>
		props.$isOverdue && !props.$completed
			? 'border-left: 3px solid red; background-color: #fff8f8;'
			: ''}

	@media (max-width: 768px) {
		padding: 0.8rem;
		gap: 0.8rem;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		padding: 0.75rem;
		gap: 0.5rem;
	}
`;

const TaskContent = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	width: 100%;
	align-items: center;
	gap: 1rem;

	@media (max-width: 768px) {
		gap: 0.8rem;
	}

	@media (max-width: 600px) {
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
	}
`;

const TaskMeta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	align-items: flex-start;

	@media (max-width: 600px) {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (max-width: 480px) {
		font-size: 0.9rem;
	}
`;

const TaskDate = styled.span`
	font-size: var(--fs-sm);
	color: ${(props) => (props.$completed ? '#888' : '#666')};
	text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
	transition: all 0.2s ease;

	@media (max-width: 480px) {
		font-size: 0.8rem;
	}
`;

const DeadlineDate = styled(TaskDate)`
	color: ${(props) => {
		if (props.$completed) return '#888';
		return props.$isOverdue ? 'red' : '#666';
	}};
	font-weight: ${(props) => (props.$isOverdue ? 'bold' : 'light')};
	white-space: nowrap;
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
  color: var(--delete-color);
  flex-shrink: 0;
  transition: transform 0.2s ease;
  margin-left: auto;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;

export const TaskList = ({ tasks, onDeleteTask, onToggleStatus }) => {
	const formatDate = (dateString) => {
		if (!dateString) return 'Не указан';
		const date = new Date(dateString);
		return date.toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<List>
			{tasks.map((task) => {
				const isOverdue =
					task.deadline &&
					new Date(task.deadline) < new Date() &&
					!task.completed;

				return (
					<TaskItem
						key={task.id}
						$completed={task.completed}
						$isOverdue={isOverdue}
					>
						<Checkbox
							type="checkbox"
							checked={task.completed}
							onChange={() => onToggleStatus(task.id)}
						/>
						<TaskContent>
							<TaskText $completed={task.completed}>
								{task.text}
							</TaskText>
							<TaskMeta>
								<TaskDate $completed={task.completed}>
									Создано: {task.createdAt}
								</TaskDate>
								<DeadlineDate
									$completed={task.completed}
									$isOverdue={isOverdue}
								>
									Дедлайн: {formatDate(task.deadline)}
									{isOverdue && ' (Просрочено!)'}
								</DeadlineDate>
							</TaskMeta>
						</TaskContent>
						<DeleteButton
							size={20}
							onClick={() => onDeleteTask(task.id)}
						/>
					</TaskItem>
				);
			})}
		</List>
	);
};
