import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import { pillars, tiers, wins } from '../data';

export default function Marketing() {
  const [openTier, setOpenTier] = useState(0);
  const [pillar, setPillar] = useState<number | null>(null);
  const closePillar = useCallback(() => setPillar(null), []);
  const active = pillar === null ? null : pillars[pillar];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="nav dark">
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            <a href="#philosophy">Philosophy</a>
            <a href="#programs">Programs</a>
            <a href="#tiers">Coaching Tiers</a>
            <a href="#results">Transformations</a>
          </nav>
          <div className="nav-right">
            <Link to="/login" className="ghost">
              Client Login
            </Link>
            <Link to="/subscribe" className="pill">
              Start Leveling Up
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero dark">
          <video className="hero-video" src="/hero.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="wrap hero-content">
            <p className="eyebrow">Global Fitness • Nutrition • Lifestyle Elevation</p>
            <h1 className="display hero-title">
              Level up your
              <br />
              entire life.
            </h1>

            <div className="hero-brand display">REP AFTER REP.</div>

            <div className="hero-bottom">
              <p className="hero-caption">
                Global 1-on-1 training, personalized nutrition, and daily habit systems engineered to elevate how you
                look, think, and perform every single day.
              </p>
            </div>
          </div>
        </section>

        <section className="philosophy light" id="philosophy">
          <div className="wrap philosophy-grid">
            <span className="star big">✦</span>
            <div>
              <h2 className="display philosophy-title">Discipline in the gym. Momentum in life.</h2>
              <p>
                Most programs hand you a generic PDF and leave you to figure it out. At RepAfterRep, we treat fitness
                and nutrition as the foundation for upgrading your entire existence. No matter where you are in the
                world, we build sustainable training blocks, realistic meal frameworks, and daily accountability habits
                that sharpen your mind, skyrocket your energy, and transform your physique, one rep at a time.
              </p>
              <a href="#apply" className="pill">
                Apply for Coaching
              </a>
            </div>
          </div>
        </section>

        <section className="block dark" id="programs">
          <div className="wrap">
            <div className="section-head">
              <h2 className="display section-title">The Pillars</h2>
              <a href="#programs" className="see-all">
                Explore all <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="pillars">
              {pillars.map((p, i) => (
                <button key={p.title} className="pillar" onClick={() => setPillar(i)}>
                  <span className="pillar-no">0{i + 1}</span>
                  <span className="pillar-text">
                    <span className="display pillar-title">{p.title}</span>
                    <span className="pillar-sub">{p.subtitle}</span>
                  </span>
                  <span className="pillar-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="block light" id="tiers">
          <div className="wrap">
            <p className="eyebrow section-label">Coaching Tiers</p>
            {tiers.map((t, i) => {
              const isOpen = openTier === i;
              return (
                <div className="tier" key={t.name}>
                  <button
                    className="tier-summary"
                    aria-expanded={isOpen}
                    aria-controls={`tier-panel-${i}`}
                    onClick={() => setOpenTier(isOpen ? -1 : i)}
                  >
                    <span className="display tier-title">{t.name}</span>
                    <span className="tier-tag">{t.tag}</span>
                    <span className="star" aria-hidden="true">
                      ✦
                    </span>
                    <span className={`plus ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div id={`tier-panel-${i}`} className={`tier-panel ${isOpen ? 'is-open' : ''}`}>
                    <div className="tier-panel-inner">
                      <p>{t.body}</p>
                      <Link to="/subscribe" className="pill tier-cta">
                        View {t.name} plans
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="closing green" id="results">
          <div className="wrap">
            <span className="star big">✦</span>
            <h2 className="display closing-title">
              Your body is
              <br />
              your foundation
            </h2>
            <div className="closing-row">
              <p>
                Stop coasting through your days. Join clients across 20+ countries building stronger bodies, sharper
                minds, and unstoppable daily routines.
              </p>
              <a href="#apply" className="pill">
                Begin Your Transformation
              </a>
            </div>
            <div className="wins">
              {wins.map((w) => (
                <span key={w} className="badge">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="apply" className="footer dark">
        <div className="wrap footer-inner">
          <Logo />
          <div className="footer-meta">
            <span>© 2026 RepAfterRep. Fitness • Nutrition • Lifestyle.</span>
            <span>hello@repafterep.example</span>
          </div>
        </div>
      </footer>

      <Modal open={active !== null} onClose={closePillar} label={active?.title ?? 'Program'}>
        {active && (
          <div className="modal-body">
            <p className="eyebrow">Program {pillar !== null ? `0${pillar + 1}` : ''}</p>
            <h3 className="display modal-title">{active.title}</h3>
            <p className="modal-copy">{active.subtitle}</p>
            <ul className="modal-list">
              {active.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <a href="#apply" className="pill" onClick={closePillar}>
              Apply for Coaching
            </a>
          </div>
        )}
      </Modal>

    </>
  );
}
