import React from "react";
import { Route, Routes } from "react-router-dom";
import MainHomepage from "./components/mainHomepage";
import Login from "./components/admin/login";
import Dashboard from "./components/admin/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainHomepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
