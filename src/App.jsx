import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Halo from "./pages/halo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Halo />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
