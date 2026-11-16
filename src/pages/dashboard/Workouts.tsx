import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { week, type Exercise } from '../../data';

type SetLog = { weight: string; reps: string; done: boolean };

function parseRest(rest: string) {
  if (rest.includes(':')) {
    const [m, s] = rest.split(':').map(Number);
    return m * 60 + s;
  }
  return parseInt(rest, 10);
}

function ExerciseRow({ ex }: { ex: Exercise }) {
  const [sets, setSets] = useState<SetLog[]>(() =>
    Array.from({ length: ex.sets }, () => ({ weight: '', reps: '', done: false })),
  );
  const [demo, setDemo] = useState(false);
  const [rest, setRest] = useState<number | null>(null);

  useEffect(() => {
    if (rest === null || rest <= 0) return;
    const t = setTimeout(() => setRest((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(t);
  }, [rest]);

  const update = (i: number, patch: Partial<SetLog>) =>
    setSets((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  return (
    <article className="exercise">
      <div className="exercise-head">
        <div>
          <h3 className="exercise-name">{ex.name}</h3>
          <p className="muted">
            {ex.sets} × {ex.reps} · RPE {ex.rpe} · Rest {ex.rest}
          </p>
        </div>
        <div className="exercise-actions">
          <button className="text-btn" onClick={() => setRest(parseRest(ex.rest))}>
            {rest !== null && rest > 0 ? `Rest ${Math.floor(rest / 60)}:${String(rest % 60).padStart(2, '0')}` : 'Start rest'}
          </button>
          <button className="text-btn" onClick={() => setDemo(true)}>
            Demo ▶
          </button>
        </div>
      </div>

      <ul className="set-list">
        {sets.map((s, i) => (
          <li key={i} className={`set ${s.done ? 'is-done' : ''}`}>
            <span className="set-no">Set {i + 1}</span>
            <input
              type="number"
              inputMode="decimal"
              aria-label={`${ex.name} set ${i + 1} weight in kg`}
              placeholder="kg"
              value={s.weight}
              onChange={(e) => update(i, { weight: e.target.value })}
            />
            <input
              type="number"
              inputMode="numeric"
              aria-label={`${ex.name} set ${i + 1} reps`}
              placeholder="reps"
              value={s.reps}
              onChange={(e) => update(i, { reps: e.target.value })}
            />
            <button className="set-toggle" aria-pressed={s.done} onClick={() => update(i, { done: !s.done })}>
              {s.done ? 'Done ✓' : 'Mark done'}
            </button>
          </li>
        ))}
      </ul>

      <Modal open={demo} onClose={() => setDemo(false)} label={`${ex.name} demo`}>
        <div className="modal-body">
          <p className="eyebrow">Exercise demo</p>
          <h3 className="display modal-title">{ex.name}</h3>
          <video className="modal-video" src="/hero.mp4" controls playsInline />
        </div>
      </Modal>
    </article>
  );
}

export default function Workouts() {
  const [dayIdx, setDayIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const day = week[dayIdx];

  const pick = (i: number) => {
    setDayIdx(i);
    setSaved(false);
  };

  return (
    <div className="workouts" data-reveal>
      <header className="page-head">
        <div>
          <p className="eyebrow">Workouts</p>
          <h1 className="display page-title">{day.title}</h1>
        </div>
      </header>

      <div className="day-pills" role="group" aria-label="Choose day">
        {week.map((d, i) => (
          <button key={d.day} className="day-pill" aria-pressed={i === dayIdx} onClick={() => pick(i)}>
            {d.day}
          </button>
        ))}
      </div>

      {day.exercises.length === 0 ? (
        <section className="card rest-day">
          <h2 className="card-title">Recovery day</h2>
          <p className="muted">A 20-minute walk and 10 minutes of mobility. Sleep early and hydrate.</p>
        </section>
      ) : (
        <>
          {day.exercises.map((ex) => (
            <ExerciseRow key={`${day.day}-${ex.name}`} ex={ex} />
          ))}
          <div className="save-row">
            <button className="pill solid" onClick={() => setSaved(true)}>
              Save workout log
            </button>
            {saved && (
              <p className="notice" role="status">
                Workout log saved. Jordan will review it on Friday.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
