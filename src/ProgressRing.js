import React, { useEffect, useState } from 'react';

const ProgressRing = ({ size = 200, onFinish }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [pulse, setPulse] = useState(0);
  const [step, setStep] = useState(0);
  const [incomeProgress, setIncomeProgress] = useState(100);
  const [capitalProgress, setCapitalProgress] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [capitalHighlight, setCapitalHighlight] = useState(false);
  const [markerAngle, setMarkerAngle] = useState(0);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(prev => (prev === 0 ? 2 : 0));
    }, 1000);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    let interval;
    if (step === 1) {
      let progress = 100;
      interval = setInterval(() => {
        if (progress > 0) {
          progress -= 10;
          setIncomeProgress(progress);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            progress = 100;
            setIncomeProgress(progress);
            interval = setInterval(() => {
              if (progress > 0) {
                progress -= 10;
                setIncomeProgress(progress);
              }
            }, 300);
          }, 500);
        }
      }, 300);
    }

    if (step === 2) {
      setCapitalProgress(10);
      setTimeout(() => {
        let introFlash = 0;
        const introFlashInterval = setInterval(() => {
          setCapitalHighlight(h => !h);
          introFlash++;
          if (introFlash >= 6) {
            clearInterval(introFlashInterval);
            setCapitalHighlight(false);
            setCapitalProgress(0);
          }
        }, 300);
      }, 300);

      let count = 0;
      interval = setInterval(() => {
        if (count >= 3) return;

        let progress = 100;
        const reduceTo = 10;
        const stepSize = 10;
        const delay = 300;

        const reduceInterval = setInterval(() => {
          if (progress > reduceTo) {
            progress -= stepSize;
            setIncomeProgress(progress);
          } else {
            clearInterval(reduceInterval);
            let flashCount = 0;

            const flashInterval = setInterval(() => {
              setCapitalHighlight(h => !h);
              setHighlight(h => !h);
              flashCount++;
              if (flashCount >= 6) {
                clearInterval(flashInterval);
                setHighlight(false);
                setCapitalHighlight(false);
                setIncomeProgress(0);
                setCapitalProgress(cp => Math.min(cp + 10, 100));
                setTimeout(() => setIncomeProgress(100), 300);
              }
            }, 300);
          }
        }, delay);

        count++;
      }, 4000);
    }

    if (step === 3) {
      interval = setInterval(() => {
        setMarkerAngle(prev => (prev + 1) % 360);
      }, 60);
    }

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      onFinish();
    }
  }, [step, onFinish]);

  const offsetIncome = circumference - (incomeProgress / 100) * circumference;
  const offsetCapital = circumference - (capitalProgress / 100) * circumference;
  const centerRadius = radius - 24 - 14 - pulse;

  const handleClick = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const getMessage = () => {
    if (step === 0) return 'Este eres tú. El punto palpitando. (Tócame para continuar)';
    if (step === 1) return 'Este es tu ingreso mensual. La mayoría de nosotros gastamos todo lo que ganamos y no nos queda nada para Invertir.';
    if (step === 2) return 'Este es tu Inversión. puede crecer cada vez que ahorras una parte de tu ingreso y lo inviertes.';
    if (step === 3) return 'Esta línea representa un año de tu vida. En cada punto tendrás oportunidad de crecer tu Inversión.';
  };

  const markerX = (size / 2) + radius * Math.cos((markerAngle - 90) * (Math.PI / 180));
  const markerY = (size / 2) + radius * Math.sin((markerAngle - 90) * (Math.PI / 180));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: '100vh' }}>
      <svg width={size} height={size} onClick={handleClick} style={{ cursor: 'pointer' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#444" strokeDasharray="4 6" strokeWidth={2} fill="none" />
        {step === 3 && (
          <circle cx={markerX} cy={markerY} r={4} fill="#ff0000" />
        )}
        <circle cx={size / 2} cy={size / 2} r={radius - 24} stroke="#c0c0c0" strokeWidth={strokeWidth} fill="none" />
        {step > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 24}
            stroke={highlight ? '#4fc3f7' : '#1e90ff'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offsetIncome}
            fill="none"
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
          />
        )}
        <circle cx={size / 2} cy={size / 2} r={radius - 10} stroke="#e0e0e0" strokeWidth={strokeWidth} fill="none" />
        {step >= 2 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 10}
            stroke={capitalHighlight ? '#ff0000' : '#ff4757'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offsetCapital}
            fill="none"
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s ease' }}
          />
        )}
        <circle cx={size / 2} cy={size / 2} r={centerRadius} fill="#111" style={{ transition: 'r 0.8s ease-in-out' }} />
      </svg>
      <p style={{ marginTop: 20, maxWidth: 300, textAlign: 'center', fontSize: 16 }}>{getMessage()}</p>
      {step === 3 && (
        <button onClick={() => setStep(4)} style={{ marginTop: 20, padding: '10px 20px' }}>
          Continuar
        </button>
      )}
    </div>
  );
};

export default ProgressRing;
