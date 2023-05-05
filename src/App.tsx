import "./App.css";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="logout" element={<LogoutPage />} />
      <Route path="logout-success" element={<LogoutSuccessPage />} /> */}
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
}

export default App;
