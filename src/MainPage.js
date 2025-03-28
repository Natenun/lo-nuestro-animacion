import React, { useState } from 'react';
import ProgressRing from './ProgressRing';
import IntroCiclos from './IntroCiclos'; // 👈 nuevo
import ThreeCycles from './ThreeCycles';

const MainPage = () => {
  const [view, setView] = useState('intro');

  return (
    <>
      {view === 'intro' && <ProgressRing onFinish={() => setView('introCiclos')} />}
      {view === 'introCiclos' && <IntroCiclos onContinue={() => setView('tresCiclos')} />}
      {view === 'tresCiclos' && <ThreeCycles onBack={() => setView('intro')} />}
    </>
  );
};

export default MainPage;
