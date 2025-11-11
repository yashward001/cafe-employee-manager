import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CafesPage } from "../pages/CafesPage";
import { EmployeesPage } from "../pages/EmployeesPage";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/cafes" element={<CafesPage />} />
    <Route path="/employees" element={<EmployeesPage />} />
  </Routes>
);