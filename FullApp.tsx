import { useState, useEffect } from 'react';

const FullApp = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const styles = {
    body: {
      minHeight: '100vh',
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#f1f5f9' : '#1e293b',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    },
    header: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      padding: '1rem 2rem'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: isDark ? '#3b82f6' : '#2563eb'
    },
    themeButton: {
      padding: '0.5rem',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
      color: isDark ? '#f3f4f6' : '#374151',
      cursor: 'pointer',
      fontSize: '1.2rem'
    },
    main: {
      paddingTop: '5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '5rem 2rem 2rem 2rem'
    },
    section: {
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      margin: '2rem 0',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    hero: {
      textAlign: 'center' as const,
      background: isDark 
        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
        : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      padding: '4rem 2rem',
      borderRadius: '12px'
    },
    locationSection: {
      backgroundColor: isDark ? '#334155' : '#f1f5f9',
      border: `2px solid ${isDark ? '#475569' : '#cbd5e1'}`,
      borderRadius: '12px',
      padding: '2rem'
    },
    locationHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    locationIcon: {
      fontSize: '2rem',
      marginRight: '1rem'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      margin: '0.5rem 0',
      color: '#059669'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      margin: '0.5rem'
    }
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logo}>Łukasz Pietrzyk</div>
          <button onClick={toggleTheme} style={styles.themeButton}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>
            Łukasz Pietrzyk
          </h1>
          <p style={{ fontSize: '1.25rem', margin: '0 0 2rem 0', opacity: 0.9 }}>
            Profesjonalne mentoring i coaching dla rozwoju osobistego i zawodowego
          </p>
          <button style={styles.button}>
            Umów spotkanie
          </button>
        </section>

        {/* About Section */}
        <section style={styles.section}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>O mnie</h2>
          <p>
            Z ponad 10-letnim doświadczeniem w coachingu i mentoringu, pomagam osobom i organizacjom 
            w osiąganiu celów i rozwijaniu kompetencji. Specjalizuję się w coachingu kariery, 
            rozwoju osobistym i szkoleniach biznesowych.
          </p>
        </section>

        {/* Services Section */}
        <section style={styles.section}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oferta</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderRadius: '8px' }}>
              <h3>💼 Coaching kariery</h3>
              <p>Zmiana branży, rozwój kompetencji, planowanie ścieżki zawodowej</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderRadius: '8px' }}>
              <h3>🏢 Coaching biznesowy</h3>
              <p>Strategia rozwoju firmy, zarządzanie zespołem, efektywna komunikacja</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: isDark ? '#0f172a' : '#f8fafc', borderRadius: '8px' }}>
              <h3>🎯 Rozwój osobisty</h3>
              <p>Pewność siebie, asertywność, skuteczność w działaniu</p>
            </div>
          </div>
        </section>

        {/* Location Section - NEW FEATURE */}
        <section style={styles.section}>
          <div style={styles.locationHeader}>
            <span style={styles.locationIcon}>📍</span>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Lokalizacja</h2>
          </div>
          
          <div style={styles.locationSection}>
            <h3 style={{ color: isDark ? '#3b82f6' : '#2563eb', marginBottom: '1rem' }}>
              Gabinet Coachingowy w Warszawie
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ margin: '0.5rem 0', fontWeight: '600' }}>
                📧 ul. Przykładowa 123
              </p>
              <p style={{ margin: '0.5rem 0', fontWeight: '600' }}>
                🏙️ Warszawa, Polska
              </p>
            </div>

            <p style={{ marginBottom: '1.5rem', fontStyle: 'italic' }}>
              Mój gabinet coachingowy znajduje się w samym sercu Warszawy, w łatwo dostępnej 
              lokalizacji z doskonałym dojazdem komunikacją publiczną.
            </p>

            <h4 style={{ marginBottom: '1rem' }}>Udogodnienia:</h4>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Centralna lokalizacja w Warszawie
              </li>
              <li style={styles.featureItem}>
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Doskonały dojazd komunikacją publiczną
              </li>
              <li style={styles.featureItem}>
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Parking dla klientów
              </li>
              <li style={styles.featureItem}>
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Komfortowe warunki spotkań
              </li>
              <li style={styles.featureItem}>
                <span style={{ marginRight: '0.5rem' }}>✅</span>
                Sesje online również dostępne
              </li>
            </ul>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button style={styles.button}>
                🗺️ Otwórz mapę
              </button>
              <button style={{...styles.button, backgroundColor: '#059669'}}>
                📞 Zadzwoń teraz
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Kontakt</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <h3>Informacje kontaktowe</h3>
              <p>📧 lukasz@example.com</p>
              <p>📞 +48 123 456 789</p>
              <p>📍 Warszawa, Polska</p>
            </div>
            <div>
              <h3>Formularz kontaktowy</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Imię i nazwisko"
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    border: `1px solid ${isDark ? '#475569' : '#d1d5db'}`,
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    color: isDark ? '#f3f4f6' : '#1f2937'
                  }}
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    border: `1px solid ${isDark ? '#475569' : '#d1d5db'}`,
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    color: isDark ? '#f3f4f6' : '#1f2937'
                  }}
                />
                <textarea 
                  placeholder="Wiadomość"
                  rows={4}
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    border: `1px solid ${isDark ? '#475569' : '#d1d5db'}`,
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    color: isDark ? '#f3f4f6' : '#1f2937',
                    resize: 'vertical'
                  }}
                />
                <button type="submit" style={styles.button}>
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        color: isDark ? '#94a3b8' : '#64748b',
        borderTop: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
      }}>
        <p>© 2025 Łukasz Pietrzyk. Wszystkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default FullApp;
