import styled from 'styled-components';
import { Container } from './Container';
import { IoMoon } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { AddTask } from './AddTask';

const ItemsCount = styled.span`
	min-width: 100px;
	font-size: var(--fs-sm);
	white-space: nowrap;

	@media (max-width: 480px) {
		min-width: auto;
	}
`;

const HeaderEl = styled.header`
	box-shadow: var(--shadow);
	background-color: var(--colors-ui-header);
	padding: 0.5rem 0;

	@media (max-width: 767px) {
		padding: 0.2rem 0;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		gap: 1rem;
	}
`;

const CountBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: center;

	@media (max-width: 480px) {
		gap: 0.5rem;
		justify-content: space-between;
		width: 100%;
	}
`;

const ModeSwitcher = styled.div`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 60px;

	@media (max-width: 480px) {
		flex-direction: row;
		gap: 0.5rem;
		justify-content: center;
	}
`;

const InterActiveBlock = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: flex-end;

	@media (max-width: 767px) {
		justify-content: space-between;
		width: 100%;
	}

	@media (max-width: 480px) {
		flex-direction: column-reverse;
		align-items: stretch;
		gap: 0.5rem;
	}
`;

export const Header = ({
	onAddTask,
	allCount,
	activeCount,
	complitedCount,
}) => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<HeaderEl>
			<Container>
				<Wrapper>
					<CountBlock>
						<ItemsCount>Всего задач: {allCount}</ItemsCount>
						<ItemsCount>Активных задач: {activeCount}</ItemsCount>
						<ItemsCount>
							Завершенных задач: {complitedCount}
						</ItemsCount>
					</CountBlock>
					<InterActiveBlock>
						<AddTask onAddTask={onAddTask} />
						<ModeSwitcher onClick={toggleTheme}>
							<IoMoon size="27px" />
							<span style={{ marginTop: '0.3rem' }}>Theme</span>
						</ModeSwitcher>
					</InterActiveBlock>
				</Wrapper>
			</Container>
		</HeaderEl>
	);
};
