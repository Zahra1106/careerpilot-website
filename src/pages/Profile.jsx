import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { inputClass, labelClass, primaryBtnClass } from "../lib/ui";

export default function Profile() {
  const { user, updateMe } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await updateMe({ name, careerGoal });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">Profile</h1>
      <p className="text-ink-300 mt-2">{user?.email}</p>

      <form onSubmit={onSave} className="mt-8 glass rounded-glass p-6 sm:p-7 space-y-5 max-w-lg">
        <div>
          <label className={labelClass}>Name</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Career goal</label>
          <input
            className={inputClass}
            placeholder="e.g. Senior Frontend Engineer at a product company"
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-pink">{error}</p>}
        {saved && <p className="text-sm text-teal-light">Saved.</p>}
        <button type="submit" disabled={saving} className={primaryBtnClass}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </AppLayout>
  );
}
