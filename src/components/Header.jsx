import styled from 'styled-components';
import { Container } from './Container';
import { IoMoon } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { AddTask } from './AddTask';

const ItemsCount = styled.span`
	min-width: 100px;
`;

const HeaderEl = styled.header`
	box-shadow: var(--shadow);
	background-color: var(--colors-ui-header);
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
	padding: 2rem 0;
`;

const ModeSwitcher = styled.div`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const InterActiveBlock = styled.div`
	display: inline-grid;
	grid-template-columns: auto auto auto auto;
	gap: 1rem;
	align-content: center;
`;

export const Header = ({ onAddTask, allCount, activeCount }) => {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<HeaderEl>
			<Container>
				<Wrapper>
					<InterActiveBlock>
						<ItemsCount>Active tasks: {activeCount}</ItemsCount>
						<ItemsCount>Comlplited tasks: {allCount}</ItemsCount>
						<AddTask onAddTask={onAddTask} />
						<ModeSwitcher onClick={toggleTheme}>
							<IoMoon size="27px" style={{ margin: 'auto' }} />
							<span style={{ marginTop: '0.3rem' }}>Theme</span>
						</ModeSwitcher>
					</InterActiveBlock>
				</Wrapper>
			</Container>
		</HeaderEl>
	);
};
