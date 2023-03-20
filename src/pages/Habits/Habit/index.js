import React from 'react';
import weekDays from '../../../utils/weekDays';
import trashIcon from "../../../assets/img/dump.svg";
import { Container, Title } from './style';
import { Days, StyledDay } from '../style';

function Habit({ id, name, days, handleDeleteHabit }) {
  return (
    <Container>
      <Title>{name}</Title>
      <Days>
        {weekDays.map(weekDay => (
          <StyledDay key={weekDay.id} isSelected={days.includes(weekDay.id)}>{weekDay.day}</StyledDay>
        ))}
      </Days>

      <img alt="Trash" src={trashIcon} onClick={() => handleDeleteHabit(id)} />
    </Container>
  );
}

export default Habit;