const MinimalApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <header style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2rem' }}>
          Łukasz Pietrzyk
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>
          Mentoring i Szkolenia
        </p>
      </header>

      <main>
        <section style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Hero Section</h2>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>
            Profesjonalne mentoring i coaching dla rozwoju osobistego i zawodowego.
            Pomogę Ci osiągnąć cele i rozwijać kompetencje.
          </p>
        </section>

        <section style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>📍 Lokalizacja</h2>
          <div style={{ 
            background: '#f1f5f9', 
            padding: '1rem', 
            borderRadius: '6px',
            border: '2px solid #e2e8f0'
          }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 0.5rem 0' }}>
              Gabinet Coachingowy
            </h3>
            <p style={{ color: '#64748b', margin: '0 0 1rem 0' }}>
              📧 ul. Przykładowa 123<br/>
              🏙️ Warszawa, Polska
            </p>
            <div style={{ color: '#059669' }}>
              <p style={{ margin: '0.25rem 0' }}>✅ Centralna lokalizacja w Warszawie</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Doskonały dojazd komunikacją publiczną</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Parking dla klientów</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Komfortowe warunki spotkań</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Sesje online również dostępne</p>
            </div>
          </div>
        </section>

        <section style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Kontakt</h2>
          <p style={{ color: '#64748b' }}>
            📧 lukasz@example.com<br/>
            📞 +48 123 456 789
          </p>
        </section>
      </main>

      <footer style={{
        textAlign: 'center',
        marginTop: '2rem',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        <p>© 2025 Łukasz Pietrzyk. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default MinimalApp;
