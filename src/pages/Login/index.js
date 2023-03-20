import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { useState, useEffect } from "react";
import Logo from "../../assets/img/logo.svg";
import api from "../../services/api";
import userAuth from "../../hooks/userAuth";
import { Container, Form, Input, Button, StyledLink } from "../../components/FormComponents";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false);
  const { auth, login } = userAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/today");
    }
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    const promise = api.login({ ...formData });
    promise.then((response) => {
      setIsLoading(false);

      login(response.data);
      navigate("/today");
    });
    promise.catch(() => {
      setIsLoading(false);

      alert('Erro, tente novamente');
    });
  }

  return (
    <Container>
      <img alt="logo.svg" src={Logo} />

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          name="password"
          onChange={handleChange}
          value={formData.password}
          disabled={isLoading}
          required
        />

        <Button type="submit" disabled={isLoading}>
          {
            isLoading
              ? <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
              : "Entrar"
          }
        </Button>
      </Form>

      <StyledLink to="/register">
        Não tem uma conta? Cadastre-se!
      </StyledLink>
    </Container>
  );
}