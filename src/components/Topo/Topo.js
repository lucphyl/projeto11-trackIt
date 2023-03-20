import { useNavigate, useLocation } from "react-router-dom";
import { Container, Avatar } from "./style";
import logo from "../../assets/img/logo-mini.svg";
import userAuth from "../../hooks/userAuth";
import { semMenuSemTopo } from "../../App";

export default function Topo() {
  const { auth } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (semMenuSemTopo.includes(location.pathname)) {
    return null;
  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" onClick={() => navigate("/today")} />
      <Avatar src={auth.image} alt={auth.name} />
    </Container>
  );
}

