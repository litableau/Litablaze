import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Litablaze from "./Litablaze";

export default function App() {
  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />

      {/* Main event page */}
      <Route path="/home" element={<Litablaze />} />
    </Routes>
  );
}
