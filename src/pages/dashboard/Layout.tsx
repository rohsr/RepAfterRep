import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { signOut } from '../../auth';

const links = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/workouts', label: 'Workouts' },
  { to: '/dashboard/nutrition', label: 'Nutrition' },
  { to: '/dashboard/progress', label: 'Progress' },
  { to: '/dashboard/coach', label: 'Coach' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className={`dash ${collapsed ? 'is-collapsed' : ''}`}>
      <aside className="sidebar dark">
        <div className="sidebar-top">
          {!collapsed && <Logo />}
          <button className="collapse-btn" onClick={() => setCollapsed((c) => !c)} aria-label="Toggle sidebar">
            {collapsed ? '»' : '«'}
          </button>
        </div>
        {!collapsed && (
          <div className="profile">
            <span className="avatar" aria-hidden="true">
              AM
            </span>
            <div>
              <p className="profile-name">Alex Morgan</p>
              <p className="profile-meta">Accelerate · Day 42</p>
            </div>
          </div>
        )}
        <nav className="side-nav" aria-label="Dashboard">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="side-link">
              <span className="side-dot" aria-hidden="true" />
              {!collapsed && <span>{l.label}</span>}
            </NavLink>
          ))}
        </nav>
        <button className="side-link side-out" onClick={logout}>
          <span className="side-dot" aria-hidden="true" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </aside>

      <main className="dash-main">
        <Outlet />
      </main>

      <nav className="bottom-nav dark" aria-label="Dashboard mobile">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className="bottom-link">
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
