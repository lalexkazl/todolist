import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	font-size: var(--fs-sm);
	color: var(--colors-text);

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 0.8rem;
		padding: 0.8rem;
	}
`;

const FilterButtons = styled.div`
	display: flex;
	gap: 5px;

	@media (max-width: 480px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const FilterButton = styled.button`
	background: none;
	border: none;
	padding: 3px 7px;
	cursor: pointer;
	border-radius: 3px;
	border: 1px solid ${(props) => (props.$active ? '#ddd' : 'transparent')};
	color: ${(props) =>
		props.$active ? 'var(--colors-accent)' : 'var(--colors-text)'};

	&:hover {
		border-color: #ddd;
	}

	@media (max-width: 480px) {
		flex: 1;
		text-align: center;
		padding: 0.5rem;
	}
`;

export const TaskFilter = ({ activeFilter, onFilterChange }) => {
	return (
		<FilterContainer>
			<FilterButtons>
				<FilterButton
					$active={activeFilter === 'all'}
					onClick={() => onFilterChange('all')}
				>
					Все
				</FilterButton>
				<FilterButton
					$active={activeFilter === 'active'}
					onClick={() => onFilterChange('active')}
				>
					Активные
				</FilterButton>
				<FilterButton
					$active={activeFilter === 'completed'}
					onClick={() => onFilterChange('completed')}
				>
					Завершённые
				</FilterButton>
				<FilterButton
					$active={activeFilter === 'overdue'}
					onClick={() => onFilterChange('overdue')}
				>
					Просроченные
				</FilterButton>
			</FilterButtons>
		</FilterContainer>
	);
};
