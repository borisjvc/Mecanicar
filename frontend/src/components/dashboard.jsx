import React from 'react';

const VerticalDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Logo</h2>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Inicio</a>
          <a href="/agregar" style={styles.navLink}>Agregar Servicio</a>
          <a href="/gestionar" style={styles.navLink}>Servicios Pendientes</a>
          <a href="/realizados" style={styles.navLink}>Servicios Realizados</a>
        </nav>
      </div>
      <div style={styles.content}>
        {/* Contenido del dashboard */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#0b265b',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  content: {
    flex: '1',
    padding: '20px',
    boxSizing: 'border-box',
  },
  pageTitle: {
    fontSize: '28px',
    marginBottom: '20px',
  },
};

export default VerticalDashboard;
