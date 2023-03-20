import { useState, useEffect } from "react";
import {
  Container,
  RegisterContent,
  Title,
  Button,
} from "./style";
import Plus from "../../assets/img/plus.svg";
import userAuth from "../../hooks/userAuth";
import api from "../../services/api";
import HabitsList from "./HabitsList";
import CreateHabit from "./CriaHabito";
import useProgress from "../../hooks/userProgress";

export default function Habits() {
  const { auth } = userAuth();
  const { updateProgress } = useProgress();
  const [habits, setHabits] = useState(null);
  const [isCreateHabitFormOpen, setIsCreatingHabitFormOpen] = useState(false);

  function loadHabits() {
    const promise = api.getHabits(auth.token);
    promise.then((response) => {
      setHabits(response.data);
      loadTodayHabits();
    });
    promise.catch((error) => {
      console.log(error.response);
    });
  }

  function loadTodayHabits() {
    const promise = api.getTodayHabits(auth.token);

    promise.then((response) => {
      const doneHabits = response.data.filter(habit => habit.done);

      updateProgress(doneHabits.length, response.data.length);
    });
  }

  function handleDeleteHabit(id) {
    if (!window.confirm("Você tem certeza que deseja deletar este hábito?")) {
      return;
    }

    const promise = api.deleteHabit(id, auth.token);
    promise.then(() => {
      loadHabits();
      loadTodayHabits();
    });
  }

  useEffect(loadHabits, []);

  if (habits === null) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Container>
      <RegisterContent>
        <Title>Meus hábitos</Title>
        <Button onClick={() => setIsCreatingHabitFormOpen(true)}>
          <img alt="plus.svg" src={Plus} />
        </Button>
      </RegisterContent>

      <CreateHabit
        isOpen={isCreateHabitFormOpen}
        closeForm={() => setIsCreatingHabitFormOpen(false)}
        loadHabits={loadHabits}
      />

      <HabitsList habits={habits} handleDeleteHabit={handleDeleteHabit} />
    </Container>
  );
}