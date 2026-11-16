import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import { isOnboarded, markOnboarded, signIn } from '../auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex@repafterep.example');
  const [password, setPassword] = useState('demo-password');
  const [notice, setNotice] = useState('');
  const [onboarding, setOnboarding] = useState(false);

  const enter = () => {
    signIn();
    if (isOnboarded()) navigate('/dashboard');
    else setOnboarding(true);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    enter();
  };

  const finishOnboarding = (e: FormEvent) => {
    e.preventDefault();
    markOnboarded();
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <aside className="login-brand dark">
        <Logo />
        <div className="login-motto">
          <span className="star">✦</span>
          <h1 className="display">Discipline in the gym. Momentum in life.</h1>
          <p>Your plan, your meals, your habits and your coach, in one place, wherever you are.</p>
        </div>
      </aside>

      <section className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <p className="eyebrow">Client Portal</p>
          <h2 className="display login-title">Sign in</h2>

          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <div className="login-row">
            <button type="button" className="text-btn" onClick={() => setNotice(`Reset link sent to ${email}.`)}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="pill solid">
            Sign In
          </button>
          <button type="button" className="pill" onClick={enter}>
            Enter Demo Dashboard
          </button>
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}
        </form>
      </section>

      <Modal open={onboarding} onClose={() => setOnboarding(false)} label="Welcome onboarding">
        <form className="modal-body" onSubmit={finishOnboarding}>
          <p className="eyebrow">Welcome to RepAfterRep</p>
          <h3 className="display modal-title">Set up your profile</h3>
          <label className="field">
            <span>Main goal</span>
            <select defaultValue="strength">
              <option value="strength">Build strength</option>
              <option value="fatloss">Lose fat and keep muscle</option>
              <option value="energy">Upgrade energy and focus</option>
            </select>
          </label>
          <label className="field">
            <span>Current weight (kg)</span>
            <input type="number" defaultValue={84} min={30} max={300} />
          </label>
          <label className="field">
            <span>Training days per week</span>
            <select defaultValue="4">
              {[2, 3, 4, 5, 6].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Dietary preferences</span>
            <input type="text" placeholder="e.g. no dairy, halal" />
          </label>
          <label className="field">
            <span>Timezone</span>
            <select defaultValue="Europe/London">
              <option>Europe/London</option>
              <option>America/New_York</option>
              <option>Asia/Dubai</option>
              <option>Asia/Singapore</option>
            </select>
          </label>
          <button type="submit" className="pill solid">
            Start My Plan
          </button>
        </form>
      </Modal>
    </div>
  );
}
