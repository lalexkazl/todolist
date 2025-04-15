import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	font-size: 14px;
	color: #666;
	border-top: 1px solid #eee;
`;



const FilterButtons = styled.div`
	display: flex;
	gap: 5px;
`;

const FilterButton = styled.button`
	background: none;
	border: none;
	padding: 3px 7px;
	cursor: pointer;
	border-radius: 3px;
	border: 1px solid ${(props) => (props.$active ? '#ddd' : 'transparent')};

	&:hover {
		border-color: #ddd;
	}
`;

export const TaskFilter = ({
	activeFilter,
	onFilterChange,
}) => {
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
			</FilterButtons>
		</FilterContainer>
	);
};
