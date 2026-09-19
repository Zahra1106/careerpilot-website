import { useRef, useState } from "react";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoreRing";
import ResultList from "../components/ResultList";
import api from "../lib/api";
import { primaryBtnClass, secondaryBtnClass, textareaClass } from "../lib/ui";

export default function AnalyzeCV() {
  const [mode, setMode] = useState("paste"); // "paste" | "file"
  const [cvText, setCvText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const fileInput = useRef(null);

  const canSubmit = mode === "paste" ? cvText.trim().length >= 50 : !!file;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    setResult(null);
    try {
      let data;
      if (mode === "file") {
        const formData = new FormData();
        formData.append("cv", file);
        data = await api.post("/ai/analyze-cv", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        data = await api.post("/ai/analyze-cv", { cvText });
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">Analyze your CV</h1>
      <p className="text-ink-300 mt-2 max-w-lg">
        Paste your CV text or upload a file — you'll get an ATS score and exactly what to fix.
      </p>

      <form onSubmit={onSubmit} className="mt-8 glass rounded-glass p-6 sm:p-7">
        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setMode("paste")}
            className={`rounded-pill px-4 py-2 text-sm transition ${mode === "paste" ? "glass-strong text-ink-100" : "text-ink-500"}`}
          >
            Paste text
          </button>
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`rounded-pill px-4 py-2 text-sm transition ${mode === "file" ? "glass-strong text-ink-100" : "text-ink-500"}`}
          >
            Upload file
          </button>
        </div>

        {mode === "paste" ? (
          <textarea
            className={textareaClass}
            rows={10}
            placeholder="Paste your full CV text here (at least a few sentences)…"
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
          />
        ) : (
          <div
            onClick={() => fileInput.current?.click()}
            className="glass rounded-2xl px-6 py-10 text-center cursor-pointer hover:bg-white/[0.08] transition"
          >
            <input
              ref={fileInput}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="text-sm text-ink-100">{file ? file.name : "Click to choose a PDF, Word, or text file"}</p>
            <p className="text-xs text-ink-500 mt-1">Up to 4MB</p>
          </div>
        )}

        {error && <p className="text-sm text-pink mt-4">{error}</p>}

        <button type="submit" disabled={!canSubmit || loading} className={primaryBtnClass + " mt-5"}>
          {loading ? "Analyzing…" : "Analyze CV"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="glass-strong rounded-glass p-7">
            <ScoreRing value={result.score} size={110} label="ATS compatibility score" sublabel="Out of 100" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <ResultList title="Strengths" items={result.strengths} tone="good" />
            <ResultList title="Weaknesses" items={result.weaknesses} tone="bad" />
            <ResultList title="Missing keywords" items={result.missingKeywords} tone="warn" />
            <ResultList title="Missing skills" items={result.missingSkills} tone="warn" />
            <ResultList title="Formatting suggestions" items={result.formattingSuggestions} />
            <ResultList title="Experience suggestions" items={result.experienceSuggestions} />
            <ResultList title="Education suggestions" items={result.educationSuggestions} />
            <ResultList title="Recommendations" items={result.recommendations} tone="good" />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
