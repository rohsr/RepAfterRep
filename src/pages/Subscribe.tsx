import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { compareRows, compareValues, faqs, plans } from '../data';

type Billing = 'monthly' | 'annual';

export default function Subscribe() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [chosen, setChosen] = useState<string | null>(null);

  const chosenPlan = plans.find((p) => p.id === chosen) ?? null;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="nav dark">
        <div className="wrap nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Subscriptions">
            <Link to="/">Home</Link>
            <a href="#plans">Plans</a>
            <a href="#compare">Compare</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-right">
            <Link to="/login" className="ghost">
              Client Login
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="sub-hero dark">
          <div className="wrap">
            <p className="eyebrow">Subscriptions</p>
            <h1 className="display sub-title">Choose your level</h1>
            <p className="sub-lead">
              Three ways to train with RepAfterRep. Pick the level of coaching that fits your week and change it any time.
            </p>

            <div className="billing" role="group" aria-label="Billing period">
              <button aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>
                Monthly
              </button>
              <button aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>
                Annual <span className="save">Save 20%</span>
              </button>
            </div>
          </div>
        </section>

        <section className="block light" id="plans">
          <div className="wrap">
            <div className="plan-grid">
              {plans.map((p) => {
                const price = billing === 'monthly' ? p.monthly : p.annual;
                const selected = chosen === p.id;
                return (
                  <article key={p.id} className={`plan-card ${p.featured ? 'featured' : ''} ${selected ? 'is-selected' : ''}`}>
                    <div className="plan-head">
                      <span className={`popular ${p.featured ? '' : 'is-hidden'}`} aria-hidden={!p.featured}>
                        Most popular
                      </span>
                      <h2 className="display plan-name">{p.name}</h2>
                      <p className="plan-tag">{p.tag}</p>
                    </div>
                    <p className="plan-price">
                      <span className="display price-num">${price}</span>
                      <span className="price-per">/ month</span>
                    </p>
                    <p className="plan-billing">
                      {billing === 'monthly' ? 'Billed monthly, cancel any time' : `Billed $${price * 12} yearly`}
                    </p>
                    <ul className="plan-points">
                      {p.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <button
                      className={`pill ${p.featured ? 'solid' : ''}`}
                      onClick={() => setChosen(p.id)}
                      aria-pressed={selected}
                    >
                      {selected ? 'Selected' : `Choose ${p.name}`}
                    </button>
                  </article>
                );
              })}
            </div>

            {chosenPlan && (
              <div className="chosen" role="status">
                <p>
                  <span className="star" aria-hidden="true">
                    ✦
                  </span>{' '}
                  {chosenPlan.name} selected on {billing} billing. Create your account to start.
                </p>
                <Link to="/login" className="pill solid">
                  Continue to sign up
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="block dark" id="compare">
          <div className="wrap">
            <div className="section-head">
              <h2 className="display section-title">Compare</h2>
            </div>
            <div className="table-scroll">
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col">Included</th>
                    {plans.map((p) => (
                      <th key={p.id} scope="col">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, r) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      {plans.map((p, c) => (
                        <td key={p.id}>
                          {compareValues[c][r] ? (
                            <span className="yes" aria-label="Included">
                              ✦
                            </span>
                          ) : (
                            <span className="no" aria-label="Not included">
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="block light" id="faq">
          <div className="wrap faq-grid">
            <h2 className="display section-title">Questions</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="faq">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer dark">
        <div className="wrap footer-inner">
          <Logo />
          <div className="footer-meta">
            <span>© 2026 RepAfterRep</span>
            <span>hello@repafterep.example</span>
          </div>
        </div>
      </footer>
    </>
  );
}
