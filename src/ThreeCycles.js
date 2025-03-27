import React, { useEffect, useState } from 'react';

const Cycle = ({ mode }) => {
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [income, setIncome] = useState(100);
  const [capital, setCapital] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 2) % 360);
      setIncome(prev => {
        if (prev > 10) return prev - 10;
        return 100;
      });
      if (mode === 2 && income <= 10) setCapital(c => Math.min(c + 10, 100));
      if (mode === 3 && income <= 10) setCapital(c => Math.min(c + 20, 100));
    }, 800);
    return () => clearInterval(interval);
  }, [income, mode]);

  const offsetIncome = circumference - (income / 100) * circumference;
  const offsetCapital = circumference - (capital / 100) * circumference;
  const markerX = (size / 2) + radius * Math.cos((angle - 90) * Math.PI / 180);
  const markerY = (size / 2) + radius * Math.sin((angle - 90) * Math.PI / 180);

  return (
    <div style={{ marginBottom: 40 }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#444" strokeDasharray="4 6" strokeWidth={2} fill="none" />
        <circle cx={markerX} cy={markerY} r={3} fill="red" />
        <circle cx={size / 2} cy={size / 2} r={radius - 16} stroke="#ccc" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 16}
          stroke="#1e90ff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetIncome}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <circle cx={size / 2} cy={size / 2} r={radius - 6} stroke="#eee" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 6}
          stroke="#ff4757"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetCapital}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <circle cx={size / 2} cy={size / 2} r={radius - 28} fill="#111" />
      </svg>
      <p style={{ textAlign: 'center', maxWidth: 180 }}>
        {mode === 1 && 'Gasta todo, nunca crece su capital'}
        {mode === 2 && 'Gasta todo, pero su consumo genera capital'}
        {mode === 3 && 'Ahorra parte y su consumo también capitaliza'}
      </p>
    </div>
  );
};

const ThreeCycles = () => {
  return (
    <div style={{ background: '#fff', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>Comparación de Comportamientos Financieros</h2>
      <Cycle mode={1} />
      <Cycle mode={2} />
      <Cycle mode={3} />
    </div>
  );
};

export default ThreeCycles;
