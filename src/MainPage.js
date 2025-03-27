import React, { useState } from 'react';
import ProgressRing from './ProgressRing';
import ThreeCycles from './ThreeCycles';

const MainPage = () => {
  const [view, setView] = useState('intro');

  return (
    <>
      {view === 'intro' && <ProgressRing onFinish={() => setView('compare')} />}
      {view === 'compare' && <ThreeCycles />}
    </>
  );
};

export default MainPage;
