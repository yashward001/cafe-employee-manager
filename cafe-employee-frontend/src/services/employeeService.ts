import { api } from "./api";
import type { Employee, EmployeePayload } from "../types/employee";

// ✅ Fetch all employees (optionally filtered by cafe)
export const getEmployees = async (cafe?: string): Promise<Employee[]> => {
  const res = await api.get("/employees", { params: { cafe } });
  return res.data;
};

// ✅ Create employee — map frontend fields to backend expectations

export const createEmployee = async (data: EmployeePayload) => {
  // Map frontend form fields -> backend expected keys
  const payload = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phone,
    gender: data.gender || "U",              // optional: 'M', 'F', 'U'
    startDate: new Date().toISOString(),     // backend requires startDate
    cafeId: data.cafeId || null              // null or UUID of an existing cafe
  };

  console.log("📤 Sending employee payload:", payload);

  const res = await api.post("/employees", payload);
  return res.data;
};

// ✅ Update employee
export const updateEmployee = async (id: string, data: EmployeePayload): Promise<Employee> => {
  const payload = {
    name: data.name,
    email: data.email,                 // ✅ match backend key
    phoneNumber: data.phone,           // ✅ match backend key
    gender: (data as any).gender ?? "U",
    startDate: new Date().toISOString(),
    cafeId: data.cafeId || null,         // ✅ backend expects cafeId
  };
  const res = await api.put(`/employees/${id}`, payload);
  return res.data;
};

// ✅ Delete employee
export const deleteEmployee = async (id: string): Promise<{ ok: boolean }> => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};