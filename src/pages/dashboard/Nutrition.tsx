import { useState, type FormEvent } from 'react';
import { macros, meals } from '../../data';

const RING_R = 44;
const RING_C = 2 * Math.PI * RING_R;

function Ring({ label, value, target, unit }: { label: string; value: number; target: number; unit: string }) {
  const pct = Math.min(value / target, 1);
  return (
    <figure className="ring">
      <svg viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="55" r={RING_R} className="ring-track" />
        <circle
          cx="55"
          cy="55"
          r={RING_R}
          className="ring-value"
          strokeDasharray={`${pct * RING_C} ${RING_C}`}
          transform="rotate(-90 55 55)"
        />
      </svg>
      <figcaption>
        <span className="ring-num display">
          {value}
          {unit === 'kcal' ? '' : unit}
        </span>
        <span className="ring-label">
          {label} / {target}
          {unit === 'kcal' ? ' kcal' : unit}
        </span>
      </figcaption>
    </figure>
  );
}

function MealCard({ name, time, options, kcal }: { name: string; time: string; options: string[]; kcal: number }) {
  const [idx, setIdx] = useState(0);
  return (
    <article className="card meal">
      <div className="meal-head">
        <div>
          <p className="eyebrow">
            {name} · {time}
          </p>
          <p className="meal-main">{options[idx]}</p>
        </div>
        <span className="meal-kcal">{kcal} kcal</span>
      </div>
      <button className="text-btn" onClick={() => setIdx((i) => (i + 1) % options.length)}>
        Swap meal ↻
      </button>
    </article>
  );
}

export default function Nutrition() {
  const [water, setWater] = useState(5);
  const [entries, setEntries] = useState<{ name: string; kcal: number }[]>([]);
  const [food, setFood] = useState('');
  const [kcal, setKcal] = useState('');

  const addEntry = (e: FormEvent) => {
    e.preventDefault();
    if (!food.trim() || !kcal) return;
    setEntries((prev) => [...prev, { name: food.trim(), kcal: Number(kcal) }]);
    setFood('');
    setKcal('');
  };

  const extra = entries.reduce((sum, en) => sum + en.kcal, 0);

  return (
    <div className="nutrition">
      <header className="page-head">
        <div>
          <p className="eyebrow">Nutrition</p>
          <h1 className="display page-title">Today's fuel</h1>
        </div>
      </header>

      <section className="card rings">
        {macros.map((m) => (
          <Ring key={m.label} label={m.label} value={m.value + (m.label === 'Calories' ? extra : 0)} target={m.target} unit={m.unit} />
        ))}
      </section>

      <div className="split">
        <section className="meal-list" aria-label="Meal plan">
          {meals.map((m) => (
            <MealCard key={m.name} {...m} />
          ))}
        </section>

        <div className="stack">
          <section className="card">
            <h2 className="card-title">Log food</h2>
            <form className="log-form" onSubmit={addEntry}>
              <input
                type="text"
                placeholder="Food or meal"
                aria-label="Food name"
                value={food}
                onChange={(e) => setFood(e.target.value)}
              />
              <input
                type="number"
                placeholder="kcal"
                aria-label="Calories"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
              />
              <button type="submit" className="pill">
                Add
              </button>
            </form>
            {entries.length > 0 && (
              <ul className="log-list">
                {entries.map((en, i) => (
                  <li key={i}>
                    <span>{en.name}</span>
                    <span>{en.kcal} kcal</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="card">
            <h2 className="card-title">Water</h2>
            <p className="muted">{water} of 8 glasses</p>
            <div className="water" aria-label={`${water} of 8 glasses`}>
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className={i < water ? 'drop is-on' : 'drop'} aria-hidden="true" />
              ))}
            </div>
            <div className="water-btns">
              <button className="pill" onClick={() => setWater((w) => Math.max(0, w - 1))} aria-label="Remove a glass">
                −
              </button>
              <button className="pill solid" onClick={() => setWater((w) => Math.min(8, w + 1))} aria-label="Add a glass">
                + Glass
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
