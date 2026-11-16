import { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Preloader from './components/Preloader';
import Marketing from './pages/Marketing';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import DashboardLayout from './pages/dashboard/Layout';
import Overview from './pages/dashboard/Overview';
import Workouts from './pages/dashboard/Workouts';
import Nutrition from './pages/dashboard/Nutrition';
import Progress from './pages/dashboard/Progress';
import Coach from './pages/dashboard/Coach';
import { isAuthed } from './auth';

function RequireAuth({ children }: { children: JSX.Element }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [booting, setBooting] = useState(() => !sessionStorage.getItem('rap-booted'));
  const finishBoot = useCallback(() => {
    sessionStorage.setItem('rap-booted', '1');
    setBooting(false);
  }, []);

  return (
    <>
      {booting && <Preloader onDone={finishBoot} />}
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="progress" element={<Progress />} />
          <Route path="coach" element={<Coach />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
