import api from "../../../services/api";
import Check from "../../../assets/img/check.svg";
import {
  Container,
  DetailsContainer,
  Title,
  Paragraph,
  CurrentSequence,
  HighestSequence,
  CheckMarkContainer
} from "./style";
import userAuth from "../../../hooks/userAuth";

export default function Habit({
  id,
  name,
  done,
  currentSequence,
  highestSequence,
  loadTodayHabits
}) {
  const { auth } = userAuth();
  const currentSequenceIsHighest = currentSequence > 0 && currentSequence === highestSequence;

  function formatDayText(quantity) {
    if (quantity === 1) return 'dia';

    return 'dias';
  }

  function handleCheckHabit() {
    if (done) {
      const promise = api.uncheckHabit(id, auth.token);
      promise.then(() => {
        loadTodayHabits();
      });

      return;
    }

    const promise = api.checkHabit(id, auth.token);
    promise.then(() => {
      loadTodayHabits();
    });
  }

  return (
    <Container>
      <DetailsContainer>
        <Title>{name}</Title>
        <Paragraph>
          Sequência atual:
          <CurrentSequence done={done}>
            {currentSequence} {formatDayText(currentSequence)}
          </CurrentSequence>
        </Paragraph>
        <Paragraph>
          Seu recorde:
          <HighestSequence currentSequenceIsHighest={currentSequenceIsHighest}>
            {highestSequence} {formatDayText(highestSequence)}
          </HighestSequence>
        </Paragraph>
      </DetailsContainer>

      <CheckMarkContainer
        done={done}
        onClick={handleCheckHabit}
      >
        <img alt="check.svg" src={Check} />
      </CheckMarkContainer>
    </Container>
  );
}