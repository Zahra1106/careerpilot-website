import { useState } from "react";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoreRing";
import ResultList from "../components/ResultList";
import api from "../lib/api";
import { primaryBtnClass, labelClass, textareaClass } from "../lib/ui";

export default function JobMatch() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const canSubmit = cvText.trim().length >= 50 && jobDescription.trim().length >= 20;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await api.post("/ai/match-job", { cvText, jobDescription });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">Match a job</h1>
      <p className="text-ink-300 mt-2 max-w-lg">
        Paste your CV and a job description to see exactly how well you fit — and what's missing.
      </p>

      <form onSubmit={onSubmit} className="mt-8 glass rounded-glass p-6 sm:p-7 space-y-5">
        <div>
          <label className={labelClass}>Your CV text</label>
          <textarea
            className={textareaClass}
            rows={7}
            placeholder="Paste your CV text…"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Job description</label>
          <textarea
            className={textareaClass}
            rows={7}
            placeholder="Paste the job description…"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-pink">{error}</p>}
        <button type="submit" disabled={!canSubmit || loading} className={primaryBtnClass}>
          {loading ? "Matching…" : "Check my match"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="glass-strong rounded-glass p-7">
            <ScoreRing value={result.matchPercentage} size={110} label="Match score" sublabel="Against this job description" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <ResultList title="Matching skills" items={result.matchingSkills} tone="good" />
            <ResultList title="Missing skills" items={result.missingSkills} tone="bad" />
            <ResultList title="Missing keywords" items={result.missingKeywords} tone="warn" />
            <ResultList title="Relevant experience" items={result.relevantExperience} />
            <ResultList title="Recommendations" items={result.recommendations} tone="good" />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
