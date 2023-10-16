import React from 'react';
import styles from '../Analyst Login/analyst.module.css';

const AnalystLogin = ({ setShowAnalystLogin, analystPassword, setAnalystPassword, setIsAnalystLoggedIn }) => {
    return (
        <div className={styles.analystLoginContainer}>
            <h1 className={styles.analystLoginTitle}>Analyst Login</h1>
            <input type="password" value={analystPassword} onChange={(e) => setAnalystPassword(e.target.value)} className={styles.analystLoginInput} />
            <button
                onClick={() => {
                    setShowAnalystLogin(false);
                    setIsAnalystLoggedIn(true);
                }}
                className={styles.analystLoginButton}
            >
                Login
            </button>
        </div>
    );
};

export default AnalystLogin;
