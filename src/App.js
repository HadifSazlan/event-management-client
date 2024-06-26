import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import HomePage from "./pages/home.js";
import { EventsList } from "./components/eventsList.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<EventsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
