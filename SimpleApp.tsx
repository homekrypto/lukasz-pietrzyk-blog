const SimpleApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🚀 React App Works! 🚀
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Łukasz Pietrzyk - Professional Website
        </p>
        <p style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '1.5rem' }}>
          ✅ React is Running Successfully!
        </p>
        <p>Location section and all components ready...</p>
      </div>
    </div>
  );
};

export default SimpleApp;
