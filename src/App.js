import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topo from "./components/Topo/Topo";
import Menu from "./components/Menu/menu";
import { AuthProvider } from "./contexts/AuthC";
import { ProgressProvider } from "./contexts/PercentageC";
import { Habits, Historic, Login, Register, Today } from "./pages";

export const semMenuSemTopo = ['/', '/register'];

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Topo />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/today" element={<Today />} />
            <Route path="/historic" element={<Historic />} />
          </Routes>
          <Menu />
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

