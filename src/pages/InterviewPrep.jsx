import { useState } from "react";
import AppLayout from "../components/AppLayout";
import ResultList from "../components/ResultList";
import ScoreRing from "../components/ScoreRing";
import api from "../lib/api";
import { inputClass, labelClass, primaryBtnClass, secondaryBtnClass, textareaClass } from "../lib/ui";

const difficulties = ["Easy", "Medium", "Hard"];
const types = ["Technical", "HR", "Behavioral", "Mixed"];

export default function InterviewPrep() {
  const [phase, setPhase] = useState("setup"); // setup | question | feedback
  const [setup, setSetup] = useState({ jobRole: "", difficulty: "Medium", interviewType: "Mixed" });
  const [session, setSession] = useState({ sessionId: null, question: null });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async (sessionId) => {
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/ai/interview-question", { ...setup, sessionId: sessionId || undefined });
      setSession({ sessionId: data.sessionId, question: data.question });
      setAnswer("");
      setFeedback(null);
      setPhase("question");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onStart = (e) => {
    e.preventDefault();
    if (!setup.jobRole.trim()) return;
    askQuestion(null);
  };

  const onSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/ai/evaluate-answer", {
        sessionId: session.sessionId,
        question: session.question,
        answer,
        jobRole: setup.jobRole,
      });
      setFeedback(data);
      setPhase("feedback");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">Prepare for interviews</h1>
      <p className="text-ink-300 mt-2 max-w-lg">
        Practice real questions for the role you're chasing, and get feedback that actually helps.
      </p>

      {phase === "setup" && (
        <form onSubmit={onStart} className="mt-8 glass rounded-glass p-6 sm:p-7 space-y-5 max-w-lg">
          <div>
            <label className={labelClass}>Job role</label>
            <input
              className={inputClass}
              placeholder="e.g. Frontend Engineer"
              value={setup.jobRole}
              onChange={(e) => setSetup({ ...setup, jobRole: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Difficulty</label>
              <select
                className={inputClass}
                value={setup.difficulty}
                onChange={(e) => setSetup({ ...setup, difficulty: e.target.value })}
              >
                {difficulties.map((d) => (
                  <option key={d} value={d} className="bg-canvas2">
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Interview type</label>
              <select
                className={inputClass}
                value={setup.interviewType}
                onChange={(e) => setSetup({ ...setup, interviewType: e.target.value })}
              >
                {types.map((t) => (
                  <option key={t} value={t} className="bg-canvas2">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-pink">{error}</p>}
          <button type="submit" disabled={loading} className={primaryBtnClass}>
            {loading ? "Starting…" : "Start practicing"}
          </button>
        </form>
      )}

      {phase !== "setup" && (
        <div className="mt-8 max-w-2xl space-y-6">
          <div className="glass-strong rounded-glass p-7">
            <p className="text-xs text-ink-500 mb-2">
              {setup.interviewType} · {setup.difficulty} · {setup.jobRole}
            </p>
            <p className="font-display text-lg text-ink-100 leading-snug">{session.question}</p>
          </div>

          {phase === "question" && (
            <form onSubmit={onSubmitAnswer} className="glass rounded-glass p-6 sm:p-7 space-y-4">
              <textarea
                className={textareaClass}
                rows={6}
                placeholder="Type your answer…"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {error && <p className="text-sm text-pink">{error}</p>}
              <button type="submit" disabled={loading} className={primaryBtnClass}>
                {loading ? "Evaluating…" : "Submit answer"}
              </button>
            </form>
          )}

          {phase === "feedback" && feedback && (
            <>
              <div className="glass rounded-glass p-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <ScoreRing value={feedback.score} size={72} label="Overall" />
                <ScoreRing value={feedback.clarity} size={72} label="Clarity" />
                <ScoreRing value={feedback.technicalAccuracy} size={72} label="Accuracy" />
                <ScoreRing value={feedback.confidence} size={72} label="Confidence" />
              </div>

              <ResultList title="What was missing" items={feedback.missingPoints} tone="warn" />

              <div className="glass rounded-glass p-6">
                <h3 className="font-display font-semibold text-ink-100 mb-3">A strong model answer</h3>
                <p className="text-sm text-ink-300 leading-relaxed">{feedback.betterAnswer}</p>
              </div>

              <ResultList title="Improvement tips" items={feedback.improvementTips} tone="good" />

              <div className="flex gap-3">
                <button onClick={() => askQuestion(session.sessionId)} disabled={loading} className={primaryBtnClass}>
                  {loading ? "Loading…" : "Next question"}
                </button>
                <button
                  onClick={() => {
                    setPhase("setup");
                    setSession({ sessionId: null, question: null });
                  }}
                  className={secondaryBtnClass}
                >
                  End session
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </AppLayout>
  );
}
