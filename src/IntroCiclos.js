import React from 'react';
import { motion } from 'framer-motion';

const IntroCiclos = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '20px 16px',
        background: '#fff',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ fontSize: 20, marginBottom: 12 }}>¿Qué hago si nunca me sobra dinero?</h3>

      <p
        style={{
          fontSize: 15,
          marginTop: 0,
          maxWidth: 300,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Si todo lo que ganas lo gastas, nunca tendrás más de lo que ya tienes.
        <br />
        La única forma de que tu dinero crezca... es invirtiéndolo.
      </p>

      <p
        style={{
          fontSize: 15,
          marginTop: 16,
          maxWidth: 300,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        En <strong>Lo Nuestro</strong> resolvemos esto de forma sencilla:
        <br />
        una parte de tus compras se convierte en inversión, sin poner dinero de tu bolsillo.
      </p>

      <button
        onClick={onContinue}
        style={{
          marginTop: 24,
          padding: '10px 16px',
        }}
      >
        Ver comparaciones
      </button>
    </motion.div>
  );
};

export default IntroCiclos;
