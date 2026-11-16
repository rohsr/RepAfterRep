import { useState, type FormEvent } from 'react';

type Message = { id: number; from: 'coach' | 'me'; text: string };

const slots = ['Mon 18:00', 'Wed 07:30', 'Fri 18:30', 'Sat 09:00'];

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'coach', text: 'Great work on the squat this week. How did the knees feel on Friday?' },
    { id: 2, from: 'me', text: 'Good, no pain. Slept better too.' },
    { id: 3, from: 'coach', text: 'Love that. Keep the protein up at breakfast and we will review on Friday.' },
  ]);
  const [draft, setDraft] = useState('');
  const [slot, setSlot] = useState<string | null>(null);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: 'me', text: draft.trim() }]);
    setDraft('');
  };

  return (
    <div className="coach">
      <header className="page-head">
        <div>
          <p className="eyebrow">Coach</p>
          <h1 className="display page-title">Jordan</h1>
        </div>
      </header>

      <div className="split coach-split">
        <section className="card thread-card">
          <ul className="thread" aria-label="Messages">
            {messages.map((m) => (
              <li key={m.id} className={`bubble ${m.from === 'me' ? 'me' : 'coach-msg'}`}>
                {m.text}
              </li>
            ))}
          </ul>
          <form className="composer" onSubmit={send}>
            <input
              type="text"
              placeholder="Message Jordan"
              aria-label="Message"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="pill solid">
              Send
            </button>
          </form>
        </section>

        <section className="card">
          <h2 className="card-title">Book a 1-on-1 check-in</h2>
          <p className="muted">30-minute video call, your time zone.</p>
          <div className="slots">
            {slots.map((s) => (
              <button key={s} className="pill" aria-pressed={slot === s} onClick={() => setSlot(s)}>
                {s}
              </button>
            ))}
          </div>
          {slot && (
            <p className="notice" role="status">
              Requested {slot}. You will get a confirmation once Jordan accepts.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
