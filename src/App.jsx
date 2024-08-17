import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Poli from "./pages/poli";
import Login from "./pages/login";
import Register from "./pages/register";
import Otp from "./pages/otp";
import RegisterDokter from "./pages/dokterRegister";
import LoginDokter from "./pages/dokterLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poli" element={<Poli />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/dokter/login" element={<LoginDokter />} />
          <Route path="/dokter/register" element={<RegisterDokter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
