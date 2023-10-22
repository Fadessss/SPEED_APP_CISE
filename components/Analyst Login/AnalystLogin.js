import React from 'react';
import styles from '../Analyst Login/analyst.module.css';

const AnalystLogin = ({ handleAnalystLogout, analystPassword, setAnalystPassword, isAnalystLoggedIn, handleAnalystLogin }) => {
    return (
        <div className={styles.analystLoginContainer}>
            {/* Conditionally render text and button label based on analyst login state */}
            {isAnalystLoggedIn ? (
                <>
                    <h1 className={styles.analystLogoutTitle}>Analyst Logged In</h1>
                    <button onClick={handleAnalystLogout} className={styles.analystLoginButton}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <h1 className={styles.analystLoginTitle}>Analyst Login <h5>(password is 1234)</h5></h1>
                    <input type="password" value={analystPassword} onChange={(e) => setAnalystPassword(e.target.value)} className={styles.analystLoginInput} />
                    <button onClick={handleAnalystLogin} className={styles.analystLoginButton}>
                        Login
                    </button>
                </>
            )}
        </div>
    );
};

export default AnalystLogin;
