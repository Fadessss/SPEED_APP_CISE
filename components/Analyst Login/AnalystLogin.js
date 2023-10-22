import React from 'react';
import styles from './analyst.module.css';

const AnalystLogin = ({ handleAnalystLogout, analystPassword, setAnalystPassword, isAnalystLoggedIn, handleAnalystLogin }) => {
    return (
        <div className={styles.analystLoginContainer}>
            {/* Conditionally render text and button label based on analyst login state */}
            {isAnalystLoggedIn ? (
                /* Display when the analyst is logged in */
                <>
                    <h1 className={styles.analystLogoutTitle}>Analyst Logged In</h1> {/* Display "Analyst Logged In" text */}
                    <button onClick={handleAnalystLogout} className={styles.analystLoginButton}>
                        Logout {/* Display a "Logout" button */}
                    </button>
                </>
            ) : (
                /* Display when the analyst is not logged in */
                <>
                    <h1 className={styles.analystLoginTitle}>Analyst Login</h1> {/* Display "Analyst Login" text with a password hint */}
                    <h5>(password is 1234)</h5>
                    <input
                        type="password"
                        value={analystPassword}
                        onChange={(e) => setAnalystPassword(e.target.value)}
                        className={styles.analystLoginInput} // Apply CSS styles to the input field
                    />
                    <button onClick={handleAnalystLogin} className={styles.analystLoginButton}>
                        Login {/* Display a "Login" button */}
                    </button>
                </>
            )}
        </div>
    );
};

export default AnalystLogin;
