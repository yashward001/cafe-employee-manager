import { useEffect, useMemo, useState } from "react";
import type { Employee, EmployeePayload } from "../types/employee";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../services/employeeService";
import { EmployeeForm } from "../components/EmployeeForm";
import { Spinner } from "../components/Spinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [cafeFilter, setCafeFilter] = useState("");

const load = async () => {
  setLoading(true);
  try {
    const data = await getEmployees(cafeFilter || undefined);

    // Map backend response to match frontend types
    const mapped = data.map((e: any) => ({
      id: e.id, // ✅ UUID from backend (used for delete/update)
      empCode: e.empCode, // ✅ Human-readable employee code
      name: e.name,
      email_address: e.email_address ?? e.email,
      phone_number: e.phone_number ?? e.phoneNumber,
      days_worked: e.days_worked ?? e.daysWorked ?? 0,
      cafe: e.cafe ?? e.cafeName ?? null,
    }));

    setEmployees(mapped);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { load(); }, []); // initial

const onCreate = async (payload: EmployeePayload) => {
  try {
    await createEmployee(payload);
    toast.success("✅ Employee created successfully!");
    setEditing(null);
    await load();
  } catch (err) {
    toast.error("❌ Failed to create employee.");
  }
};

const onUpdate = async (payload: EmployeePayload) => {
  if (!editing) return;
  try {
    await updateEmployee(editing.id!, payload);
    toast.success("✅ Employee updated successfully!");
    setEditing(null);
    await load();
  } catch (err) {
    toast.error("❌ Failed to update employee.");
  }
};

const onDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this employee?")) return;
  try {
    await deleteEmployee(id);
    toast.success("🗑️ Employee deleted!");
    await load();
  } catch {
    toast.error("❌ Failed to delete employee.");
  }
};
  const cafes = useMemo(() => {
    const s = new Set<string>();
    employees.forEach(e => { if (e.cafe) s.add(e.cafe); });
    return Array.from(s).sort();
  }, [employees]);

  const onFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    await load();
  };

  return (
    <div className="space-y-10">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
  <Users size={36} className="text-blue-600" />
  Employees
</h1>

    <form onSubmit={onFilter} className="flex gap-2">
      <input
        className="input"
        placeholder="🔍 Filter by cafe name (e.g., Cafe Mocha)"
        value={cafeFilter}
        onChange={(e) => setCafeFilter(e.target.value)}
        list="cafes-suggestions"
      />
      <datalist id="cafes-suggestions">
        {cafes.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <button className="btn btn-primary">Apply</button>
    </form>
  </div>

  <div className="grid gap-6 md:grid-cols-2">
    {/* Left: Form */}
    <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "✏️ Edit Employee" : "➕ Create Employee"}
      </h2>
      <EmployeeForm
        initial={editing}
        onSubmit={editing ? onUpdate : onCreate}
        onCancel={() => setEditing(null)}
      />
    </motion.div>

    {/* Right: Table */}
    <motion.div className="card overflow-x-auto" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-semibold mb-4">📋 All Employees</h2>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Days</th>
              <th>Cafe</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <motion.tr key={e.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="border-t">
                <td className="font-mono text-xs">{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email_address}</td>
                <td>{e.phone_number}</td>
                <td>{e.days_worked}</td>
                <td>{e.cafe || "—"}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-primary text-xs"
                      onClick={() => setEditing(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger text-xs"
                      onClick={() => onDelete(e.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  </div>
</div>
  );
};