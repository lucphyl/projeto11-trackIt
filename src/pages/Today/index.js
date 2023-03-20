import { useState, useEffect } from "react";
import { Container, Content } from "./style";
import useProgress from "../../hooks/userProgress";
import userAuth from "../../hooks/userAuth";
import api from "../../services/api";
import Date from "./Date";
import Subtitle from "./Subtitle";
import Habit from "./Habit";

export default function Today() {
  const { auth } = userAuth();
  const { updateProgress } = useProgress();
  const [habits, setHabits] = useState(null);
  const [doneHabitsQuantity, setDoneHabitsQuantity] = useState(0);

  function loadTodayHabits() {
    const promise = api.getTodayHabits(auth.token);

    promise.then((response) => {
      const apiHabits = response.data;
      setHabits(apiHabits);

      const doneHabits = apiHabits.filter(habit => habit.done);
      updateProgress(doneHabits.length, apiHabits.length);
      setDoneHabitsQuantity(doneHabits.length);
    });
  }

  useEffect(loadTodayHabits, []);

  if (habits === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Container>
      <Content>
        <Date />
        <Subtitle doneHabitsQuantity={doneHabitsQuantity} />
        {habits.map(habit => (
          <Habit
            key={habit.id}
            {...habit}
            loadTodayHabits={loadTodayHabits}
          />
        ))}
      </Content>
    </Container>
  );
}
