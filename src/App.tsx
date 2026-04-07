import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Styleguide from "./pages/Styleguide";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/styleguide" element={<Styleguide />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
