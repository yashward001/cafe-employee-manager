import { useEffect, useState } from "react";
import type { Cafe, CafePayload } from "../types/cafe";

type Props = {
  initial?: Cafe | null;
  onSubmit: (data: CafePayload) => Promise<void>;
  onCancel?: () => void;
};

export const CafeForm = ({ initial, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<CafePayload>({
    name: "",
    description: "",
    logo: "",
    location: "",
  });

  useEffect(() => {
    if (initial) {
      const { name, description, logo, location } = initial;
      setForm({ name, description, logo, location });
    }
  }, [initial]);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Name"
        name="name" value={form.name} onChange={handle} required
      />
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Logo URL"
        name="logo" value={form.logo} onChange={handle}
      />
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="Location"
        name="location" value={form.location} onChange={handle}
      />
      <textarea
        className="w-full rounded border px-3 py-2"
        placeholder="Description"
        name="description" value={form.description} onChange={handle}
      />
      <div className="flex gap-2">
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit">
          {initial ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button className="rounded bg-gray-200 px-4 py-2" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};