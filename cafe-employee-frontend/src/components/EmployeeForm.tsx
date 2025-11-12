import { useEffect, useState } from "react";
import type { Employee, EmployeePayload } from "../types/employee";
import type { Cafe } from "../types/cafe";
import { getCafes } from "../services/cafeService";

type Props = {
  initial?: Employee | null;
  onSubmit: (data: EmployeePayload) => Promise<void>;
  onCancel?: () => void;
};

export const EmployeeForm = ({ initial, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<EmployeePayload>({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    startDate: new Date().toISOString().slice(0, 10),
    cafeId: null,
  });

  const [cafes, setCafes] = useState<Cafe[]>([]);

  // 🔹 Fetch cafes for dropdown
  useEffect(() => {
    getCafes()
      .then(setCafes)
      .catch((err) => console.error("Failed to load cafes:", err));
  }, []);

  // 🔹 Pre-fill form when editing an existing employee
  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id ?? "",
        name: initial.name ?? "",
        email: (initial as any).email ?? (initial as any).email_address ?? "",
        phone:
          (initial as any).phone ?? (initial as any).phone_number ?? "",
        gender: (initial as any).gender ?? "Male",
        startDate:
          (initial as any).startDate
            ? new Date((initial as any).startDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        cafeId:
          (initial as any).cafeId ??
          cafes.find(
            (c) =>
              c.name.toLowerCase() ===
              ((initial as any).cafe ?? "").toLowerCase()
          )?.id ??
          null,
      });
    }
  }, [initial, cafes]);

  // 🔹 Handle input changes
  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit form
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    // Reset form after submission
    setForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      startDate: new Date().toISOString().slice(0, 10),
      cafeId: null,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* Only show ID field when creating new employee */}
      {!initial && (
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Employee ID (e.g., UIX123456)"
          name="id"
          value={form.id}
          onChange={handle}
          required
        />
      )}

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handle}
        required
      />

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handle}
        required
      />

      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Phone"
        name="phone"
        value={form.phone}
        onChange={handle}
        required
      />

      {/* 🔹 Gender selection */}
      <select
        className="w-full rounded border px-3 py-2"
        name="gender"
        value={form.gender}
        onChange={handle}
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* 🔹 Start Date */}
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Start Date"
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handle}
        required
      />

      {/* 🔹 Café dropdown */}
      <select
        className="w-full rounded border px-3 py-2"
        name="cafeId"
        value={form.cafeId || ""}
        onChange={handle}
      >
        <option value="">No Café Assigned</option>
        {cafes.map((cafe) => (
          <option key={cafe.id} value={cafe.id}>
            {cafe.name} — {cafe.location}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          {initial ? "Update" : "Create"}
        </button>

        {onCancel && (
          <button
            className="rounded bg-gray-200 px-4 py-2"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};