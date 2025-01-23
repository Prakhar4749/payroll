import React from 'react';

export default function NotFound() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    heading: {
      fontSize: '5rem',
      fontWeight: 'bold',
      color: '#ff6b6b',
    },
    message: {
      fontSize: '1.5rem',
      marginTop: '20px',
    },
    link: {
      marginTop: '30px',
      padding: '10px 20px',
      fontSize: '1.2rem',
      color: '#fff',
      backgroundColor: '#007bff',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'background 0.3s ease',
    },
    linkHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <a 
        href="/" 
        style={styles.link} 
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
      >
        Go Back Home
      </a>
    </div>
  );
}
