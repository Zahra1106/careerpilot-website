import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoreRing";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const tools = [
  { to: "/analyze-cv", title: "Analyze your CV", desc: "Get an ATS score and concrete fixes.", gradient: "from-blue-light to-violet", icon: "◎" },
  { to: "/job-match", title: "Match a job", desc: "See how well your CV fits a role.", gradient: "from-blue to-teal-light", icon: "⌁" },
  { to: "/interview-prep", title: "Practice an interview", desc: "Real questions, scored answers.", gradient: "from-pink to-violet-light", icon: "◉" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/dashboard/summary")
      .then((data) => !cancelled && setSummary(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AppLayout>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-100">
        Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
      </h1>
      <p className="text-ink-300 mt-2">Here's where things stand.</p>

      {error && (
        <div className="mt-6 glass rounded-glass p-5 text-sm text-pink">{error}</div>
      )}

      {loading ? (
        <div className="mt-8 text-ink-500 text-sm">Loading your summary…</div>
      ) : summary && !summary.hasAnyActivity ? (
        <div className="mt-8 glass-strong rounded-glass p-10 text-center">
          <p className="font-display text-lg text-ink-100">Nothing analyzed yet.</p>
          <p className="text-sm text-ink-300 mt-2 max-w-sm mx-auto">
            Start with your CV — it takes under a minute and everything else
            here builds on it.
          </p>
          <Link
            to="/analyze-cv"
            className="inline-block mt-6 rounded-pill bg-gradient-to-r from-blue-light to-violet px-6 py-3 text-sm font-medium text-canvas"
          >
            Analyze my CV
          </Link>
        </div>
      ) : (
        summary && (
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <div className="glass rounded-glass p-6">
              <ScoreRing value={summary.cvScore} label="Latest CV score" sublabel="From your most recent analysis" />
            </div>
            <div className="glass rounded-glass p-6">
              <ScoreRing value={summary.interviewReadiness} label="Interview readiness" sublabel="Average across practiced answers" />
            </div>
            <div className="glass rounded-glass p-6 flex items-center justify-between">
              <div>
                <p className="text-2xl font-display font-semibold text-ink-100">{summary.jobMatches}</p>
                <p className="text-sm text-ink-500 mt-1">Jobs matched</p>
              </div>
              <span className="text-2xl">⌁</span>
            </div>
            <div className="glass rounded-glass p-6 flex items-center justify-between">
              <div>
                <p className="text-2xl font-display font-semibold text-ink-100">{summary.applications}</p>
                <p className="text-sm text-ink-500 mt-1">Applications tracked</p>
              </div>
              <span className="text-2xl">▤</span>
            </div>
          </div>
        )
      )}

      <h2 className="font-display text-lg font-semibold text-ink-100 mt-12 mb-5">Quick actions</h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="glass rounded-glass p-6 hover:bg-white/[0.07] transition-colors">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-lg text-canvas mb-5`}>
              {t.icon}
            </div>
            <p className="font-display font-semibold text-ink-100 mb-1.5">{t.title}</p>
            <p className="text-sm text-ink-300">{t.desc}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
