import React from 'react';
import styled from 'styled-components';
import useProgress from '../../hooks/userProgress';

function Subtitle({ doneHabitsQuantity }) {
  const { progress } = useProgress();

  return (
    <Paragraph doneHabitsQuantity={doneHabitsQuantity}>
      {
        doneHabitsQuantity === 0
          ? "Nenhum hábito concluído ainda"
          : `${progress.toFixed(0)}% dos hábitos concluídos`
      }
    </Paragraph>
  );
}

const Paragraph = styled.p`
  font-size: 17.976px;
  line-height: 22px;

  margin-bottom: 28px;

  color: ${(props) => props.doneHabitsQuantity !== 0 ? "#8FC549" : "#BABABA"};
`;

export default Subtitle;