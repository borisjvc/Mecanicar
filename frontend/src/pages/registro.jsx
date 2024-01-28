import React from 'react';

function Registro() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Registrate</h1>
            <form style={styles.form}>

            <label style={styles.label} htmlFor="text">
                    Usuario:
                </label>
                <input style={styles.input} type="text" id="text" name="text" required />

                <label style={styles.label} htmlFor="email">
                    Correo Electrónico:
                </label>
                <input style={styles.input} type="email" id="email" name="email" required />

                <label style={styles.label} htmlFor="password">
                    Contraseña:
                </label>
                <input style={styles.input} type="password" id="password" name="password" required />

                <label style={styles.label} htmlFor="password">
                    Confirmar contraseña:
                </label>
                <input style={styles.input} type="password" id="password" name="password" required />

                <button style={styles.button} type="submit">
                    Registrarse
                </button>
            </form>
            <p style={styles.paragraph}>
                ¿Ya tienes una cuenta? <a href="/iniciodesesion" style={styles.link}>Ingresa aquí</a>
            </p>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'white',   
        marginTop: '10px',
        marginLeft: '200px',    
        margin: '200px',
        boxShadow: '10px #0b265b',
    },
    title: {
        fontWeight: 'Bold',
        fontSize: '70px',
        textAlign: 'center',
        color: '#0b265b',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        color:'#0b265b'
    },
    label: {
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#0b265b',
    },
    input: {
        padding: '8px',
        marginBottom: '16px',
        border: '1px solid #0b265b',
        borderRadius: '10px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#0b265b',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    paragraph: {
        textAlign: 'center',
        marginTop: '16px',
        color: '#0b265b'
    },
    link: {
        color: '#0b265b',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};
    
export default Registro;