import { useEffect, useState } from 'react';
import { macros, weights } from '../../data';

const initialChecks = [
  { id: 'workout', label: "Complete today's workout", done: false },
  { id: 'macros', label: 'Hit your macro target', done: false },
  { id: 'water', label: 'Drink 3 litres of water', done: false },
  { id: 'sleep', label: 'Get 8 hours of sleep', done: true },
  { id: 'mindset', label: 'Morning mindset habit', done: false },
];

function Skeleton() {
  return (
    <div className="overview" aria-busy="true" aria-label="Loading dashboard">
      <div className="skeleton skeleton-title" />
      <div className="kpis">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
      <div className="split">
        <div className="skeleton skeleton-card tall" />
        <div className="skeleton skeleton-card tall" />
      </div>
    </div>
  );
}

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [checks, setChecks] = useState(initialChecks);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Skeleton />;

  const doneCount = checks.filter((c) => c.done).length;
  const score = Math.round((doneCount / checks.length) * 100);
  const kcal = macros[0];
  const protein = macros[1];
  const toggle = (id: string) => setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));
  const lost = (weights[0] - weights[weights.length - 1]).toFixed(1);

  return (
    <div className="overview">
      <header className="page-head">
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="display page-title">Welcome back, Alex</h1>
        </div>
        <span className="streak">42-day streak</span>
      </header>

      <div className="kpis">
        <article className="card kpi">
          <p className="kpi-label">Today's workout</p>
          <p className="kpi-value display">Lower Strength</p>
          <p className="kpi-sub">3 exercises · Scheduled</p>
        </article>
        <article className="card kpi">
          <p className="kpi-label">Remaining today</p>
          <p className="kpi-value display">
            {kcal.target - kcal.value} <span>kcal</span>
          </p>
          <p className="kpi-sub">
            {protein.target - protein.value} g protein to go
          </p>
        </article>
        <article className="card kpi">
          <p className="kpi-label">Habit score</p>
          <p className="kpi-value display">{score}%</p>
          <div className="bar" aria-hidden="true">
            <span style={{ width: `${score}%` }} />
          </div>
        </article>
        <article className="card kpi">
          <p className="kpi-label">Weight trend</p>
          <p className="kpi-value display">
            {weights[weights.length - 1]} <span>kg</span>
          </p>
          <p className="kpi-sub">Down {lost} kg in 12 weeks</p>
        </article>
      </div>

      <div className="split">
        <section className="card">
          <h2 className="card-title">Today's checklist</h2>
          <ul className="checklist">
            {checks.map((c) => (
              <li key={c.id}>
                <label className="check">
                  <input type="checkbox" checked={c.done} onChange={() => toggle(c.id)} />
                  <span className={c.done ? 'is-done' : ''}>{c.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="card note">
          <p className="eyebrow">Coach's weekly note</p>
          <p className="note-body">
            Strong week, Alex. Your squat moved up two sessions in a row and your sleep is on target. Focus this week
            on protein at breakfast and two short walks on rest days. We will review your check-in on Friday.
          </p>
          <p className="note-sign">Jordan, your coach</p>
        </section>
      </div>
    </div>
  );
}
