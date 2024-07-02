import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import HomePage from "./pages/home.js";
import DashboardPage from "./pages/dashboard.js";
import EventList from "./components/eventList.js";
import EventTable from "./components/eventTable.js";
import PrivateRoute from "./components/privateRoute.js";
import AuthProvider from "./api/authProvider.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute role={["user", "admin"]}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role="admin">
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/event-list" element={<EventList />} />
          <Route path="/event-table" element={<EventTable />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
