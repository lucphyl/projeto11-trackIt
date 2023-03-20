import Calendar from "react-calendar";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 30px 18px;

  display: flex;
  flex-direction: column;

  background-color: #F2F2F2;
`;

const Title = styled.h2`
  font-size: 22px;
  line-height: 29px;

  padding-top: 100px;

  color: #126BA5;  
`;

const ContainerCalendar = styled.div`
  height: 75%;

  margin-bottom: 30px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;

  margin-top: 12px;

  border: none;
  border-radius: 10px;
`;

export {
  Container,
  Title,
  ContainerCalendar,
  StyledCalendar
};