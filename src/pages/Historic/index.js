import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import {
  Container,
  Title,
  ContainerCalendar,
  StyledCalendar
} from "./style";
import userAuth from "../../hooks/userAuth";
import api from "../../services/api";
import useProgress from "../../hooks/userProgress";

export default function Historic() {
  const { auth } = userAuth();
  const { updateProgress } = useProgress();
  const [historic, setHistoric] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const promise = api.getDailyHistory(auth.token);
    promise.then((response) => {
      setHistoric(response.data);
    });
    promise.catch((error) => {
      console.log(error.response);
    });

    loadTodayHabits();
  }, []);

  if (historic === null) {
    return <h1>Carregando...</h1>
  }

  function loadTodayHabits() {
    const promise = api.getTodayHabits(auth.token);

    promise.then((response) => {
      const doneHabits = response.data.filter(habit => habit.done);

      updateProgress(doneHabits.length, response.data.length);
    });
  }

  function completedAllHabits(habits) {
    return habits.filter(habit => habit.done).length !== 0;
  }

  const successDays = historic.filter(day => completedAllHabits(day.habits));
  const failureDays = historic.filter(day => !successDays.includes(day));

  function getCorrectClassName({ date }) {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");

    if (failureDays.find(x => x.day === formattedDate)) {
      return 'failure'
    }

    if (successDays.find(x => x.day === formattedDate)) {
      return 'success'
    }
  }

  function formatHabitsAlert(habits) {
    return habits.map(habit => (
      `* ${habit.name}: ${habit.done ? 'Concluído' : 'Não concluído'}\n`
    )).join('');
  }

  function handleDayClick(date) {
    const clickedDate = dayjs(date).format("DD/MM/YYYY");
    const failureDay = failureDays.find(x => x.day === clickedDate);
    const successDay = successDays.find(x => x.day === clickedDate);

    if (failureDay) {
      alert(formatHabitsAlert(failureDay.habits))
    }

    if (successDay) {
      alert(formatHabitsAlert(successDay.habits))
    }
  }

  return (
    <Container>
      <Title>Histórico</Title>
      <ContainerCalendar>
        <StyledCalendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={getCorrectClassName}
          locale="pt-BR"
          formatDay={(_, date) => dayjs(date).format('DD')}
          onClickDay={(date) => handleDayClick(date)}
        />
      </ContainerCalendar>
    </Container>
  );
}