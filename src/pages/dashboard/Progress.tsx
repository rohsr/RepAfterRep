import { useState, type FormEvent } from 'react';
import { habitLabels, habits, lifts, weights } from '../../data';

function linePoints(values: number[], w: number, h: number, pad = 14) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values.map((v, i) => {
    const x = pad + (i * (w - 2 * pad)) / (values.length - 1);
    const y = h - pad - ((v - min) / range) * (h - 2 * pad);
    return { x, y };
  });
}

function LineChart({ values, label }: { values: number[]; label: string }) {
  const W = 600;
  const H = 200;
  const pts = linePoints(values, W, H);
  const path = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={label}>
      <polyline points={path} className="chart-line" fill="none" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} className="chart-dot" />
      ))}
      <circle cx={last.x} cy={last.y} r={6} className="chart-last" />
    </svg>
  );
}

export default function Progress() {
  const [lift, setLift] = useState('Squat');
  const [sent, setSent] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [form, setForm] = useState({ weight: '', waist: '', energy: '7', sleep: '7', stress: '4', wins: '', struggles: '' });

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const liftValues = lifts[lift];
  const liftGain = (liftValues[liftValues.length - 1] - liftValues[0]).toFixed(1);

  return (
    <div className="progress" data-reveal>
      <header className="page-head">
        <div>
          <p className="eyebrow">Progress</p>
          <h1 className="display page-title">Life elevation tracker</h1>
        </div>
      </header>

      <section className="card">
        <div className="chart-head">
          <div>
            <h2 className="card-title">Strength progression</h2>
            <p className="muted">
              {lift}: +{liftGain} kg over 8 weeks
            </p>
          </div>
          <div className="seg" role="group" aria-label="Choose lift">
            {Object.keys(lifts).map((name) => (
              <button key={name} aria-pressed={lift === name} onClick={() => setLift(name)}>
                {name}
              </button>
            ))}
          </div>
        </div>
        <LineChart values={liftValues} label={`${lift} progression over 8 weeks`} />
      </section>

      <div className="split">
        <section className="card">
          <h2 className="card-title">Body weight</h2>
          <p className="muted">12 weeks, kg</p>
          <LineChart values={weights} label="Body weight trend over 12 weeks" />
        </section>

        <section className="card">
          <h2 className="card-title">Weekly habit consistency</h2>
          <div className="bars">
            {habits.map((h, i) => (
              <div key={habitLabels[i]} className="bar-col">
                <span className="bar-val">{h}%</span>
                <div className="bar-track">
                  <span style={{ height: `${h}%` }} />
                </div>
                <span className="bar-label">{habitLabels[i]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="card checkin">
        <h2 className="card-title">Weekly check-in</h2>
        {sent ? (
          <p className="notice" role="status">
            Check-in sent. Jordan will review it before your next call.
          </p>
        ) : (
          <form className="checkin-form" onSubmit={submit}>
            <div className="grid-2">
              <label className="field">
                <span>Weight (kg)</span>
                <input type="number" step="0.1" value={form.weight} onChange={set('weight')} required />
              </label>
              <label className="field">
                <span>Waist (cm)</span>
                <input type="number" step="0.5" value={form.waist} onChange={set('waist')} required />
              </label>
            </div>
            <div className="grid-3">
              <label className="field">
                <span>Energy (1–10): {form.energy}</span>
                <input type="range" min={1} max={10} value={form.energy} onChange={set('energy')} />
              </label>
              <label className="field">
                <span>Sleep (1–10): {form.sleep}</span>
                <input type="range" min={1} max={10} value={form.sleep} onChange={set('sleep')} />
              </label>
              <label className="field">
                <span>Stress (1–10): {form.stress}</span>
                <input type="range" min={1} max={10} value={form.stress} onChange={set('stress')} />
              </label>
            </div>
            <label className="field">
              <span>Progress photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPhoto(file ? URL.createObjectURL(file) : null);
                }}
              />
            </label>
            {photo && <img className="photo-preview" src={photo} alt="Progress photo preview" />}
            <label className="field">
              <span>Wins this week</span>
              <textarea rows={2} value={form.wins} onChange={set('wins')} />
            </label>
            <label className="field">
              <span>Struggles</span>
              <textarea rows={2} value={form.struggles} onChange={set('struggles')} />
            </label>
            <button type="submit" className="pill solid">
              Submit check-in
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
