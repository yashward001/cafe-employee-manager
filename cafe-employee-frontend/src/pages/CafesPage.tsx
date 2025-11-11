import { useEffect, useState } from "react";
import type { Cafe, CafePayload } from "../types/cafe";
import { getCafes, createCafe, updateCafe, deleteCafe } from "../services/cafeService";
import { CafeForm } from "../components/CafeForm";
import { Spinner } from "../components/Spinner";
import { Coffee } from "lucide-react";

export const CafesPage = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Cafe | null>(null);
  const [locationFilter, setLocationFilter] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCafes(locationFilter || undefined);
      setCafes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // initial

  const onCreate = async (payload: CafePayload) => {
    await createCafe(payload);
    setEditing(null);
    await load();
  };

  const onUpdate = async (payload: CafePayload) => {
    if (!editing) return;
    await updateCafe(editing.id, payload);
    setEditing(null);
    await load();
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this cafe?")) return;
    await deleteCafe(id);
    await load();
  };

  const onFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
  <Coffee size={36} className="text-blue-600" />
  Cafes
</h1>
        <form onSubmit={onFilter} className="flex gap-2">
          <input
            className="rounded border px-3 py-2"
            placeholder="Filter by location (e.g., Orchard)"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <button className="rounded bg-gray-900 text-white px-4">Apply</button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <h2 className="font-medium mb-3">{editing ? "Edit Cafe" : "Create Cafe"}</h2>
          <CafeForm
            initial={editing}
            onSubmit={editing ? onUpdate : onCreate}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="rounded-lg border bg-white p-4">
          <h2 className="font-medium mb-3">All Cafes</h2>
          {loading ? <Spinner /> : (
            <ul className="divide-y">
              {cafes.map((c) => (
                <li key={c.id} className="py-3 flex items-center gap-4">
                  <img src={c.logo} className="h-12 w-12 rounded-full object-cover" alt={c.name} />
                  <div className="flex-1">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.location} · {c.employees} employees</div>
                    <div className="text-sm text-gray-500">{c.description}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded bg-blue-600 text-white px-3 py-1"
                      onClick={() => setEditing(c)}>Edit</button>
                    <button className="rounded bg-red-600 text-white px-3 py-1"
                      onClick={() => onDelete(c.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};