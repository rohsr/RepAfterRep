import { useEffect } from 'react';
import Logo from './Logo';

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="preloader" role="status" aria-label="Loading RepAfterRep">
      <div className="preloader-inner">
        <Logo />
        <svg className="ekg-line" viewBox="0 0 400 80" aria-hidden="true">
          <path d="M0 40 H120 L138 40 L152 12 L170 68 L186 26 L198 40 H400" />
        </svg>
      </div>
    </div>
  );
}
