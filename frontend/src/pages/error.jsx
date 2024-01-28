import React from 'react';

const Error = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404</h1>
            <p style={styles.text}>¡Ups! Parece que te has perdido.</p>
            <p style={styles.text}>La página que estás buscando no se encuentra aquí.</p>
            <p style={styles.text}>¿Quieres volver a la <a href="/" style={styles.link}>página principal</a>?</p>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
        padding: '50px',
        margin: 0,
        maxWidth: '600px',
        margin: '0 auto',
    },
    heading: {
        color: '#333',
        fontSize: '150px',
        margin: 0,
    },
    text: {
        color: '#555',
        fontSize: '20px',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Error;
