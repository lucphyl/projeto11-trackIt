import dayjs from 'dayjs';
import ptBr from "dayjs/locale/pt-br";
import styled from 'styled-components';

export default function Date() {
  let date = dayjs().date();
  let month = dayjs().month() + 1;
  let weekDay = dayjs().day();
  let weekDayExtended = dayjs(weekDay).locale(ptBr).format('dddd').replace("-feira", "");

  if (date < 10) {
    date = 0 + date.toString();
  }

  if (month < 10) {
    month = 0 + month.toString();
  }

  return (
    <Paragraph>{weekDayExtended}, {date}/{month}</Paragraph>
  )
}

const Paragraph = styled.p`
  padding-top: 100px;

  font-size: 22.976px;
  line-height: 29px;

  color: #126BA5;
`;