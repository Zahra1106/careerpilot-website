import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import api from "../lib/api";
import { inputClass, labelClass, primaryBtnClass, secondaryBtnClass } from "../lib/ui";

const statuses = ["Saved", "Applied", "Interview", "Rejected", "Offer"];
const statusDot = {
  Saved: "bg-white/40",
  Applied: "bg-blue",
  Interview: "bg-amber",
  Rejected: "bg-pink",
  Offer: "bg-teal",
};

const emptyForm = { company: "", position: "", jobUrl: "", status: "Saved", notes: "" };

export default function Applications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/applications")
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.position.trim()) return;
    setSaving(true);
    setError("");
    try {
      await api.post("/applications", form);
      setForm(emptyForm);
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const onStatusChange = async (id, status) => {
    setItems((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
    try {
      await api.put(`/applications/${id}`, { status });
    } catch (err) {
      setError(err.message);
      load();
    }
  };

  const onDelete = async (id) => {
    setItems((prev) => prev.filter((a) => a._id !== id));
    try {
      await api.delete(`/applications/${id}`);
    } catch (err) {
      setError(err.message);
      load();
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">Applications</h1>
          <p className="text-ink-300 mt-2">Every role you're tracking, in one place.</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className={primaryBtnClass}>
          {showForm ? "Cancel" : "Add application"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={onCreate} className="mt-6 glass rounded-glass p-6 sm:p-7 grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Company</label>
            <input required className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Position</label>
            <input required className={inputClass} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Job URL (optional)</label>
            <input className={inputClass} value={form.jobUrl} onChange={(e) => setForm({ ...form, jobUrl: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {statuses.map((s) => (
                <option key={s} value={s} className="bg-canvas2">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Notes (optional)</label>
            <input className={inputClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={saving} className={primaryBtnClass}>
              {saving ? "Saving…" : "Save application"}
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-sm text-pink mt-5">{error}</p>}

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-ink-500">Loading…</p>
        ) : items.length === 0 ? (
          <div className="glass rounded-glass p-10 text-center text-ink-300 text-sm">
            No applications tracked yet — add the first one above.
          </div>
        ) : (
          items.map((a) => (
            <div key={a._id} className="glass rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="font-medium text-ink-100 truncate">
                  {a.position} <span className="text-ink-500">· {a.company}</span>
                </p>
                {a.notes && <p className="text-xs text-ink-500 mt-1 truncate">{a.notes}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`w-2 h-2 rounded-full ${statusDot[a.status] || "bg-white/40"}`} />
                <select
                  value={a.status}
                  onChange={(e) => onStatusChange(a._id, e.target.value)}
                  className="rounded-pill glass px-3 py-1.5 text-xs text-ink-100 outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s} className="bg-canvas2">
                      {s}
                    </option>
                  ))}
                </select>
                <button onClick={() => onDelete(a._id)} className="text-ink-500 hover:text-pink transition-colors text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
