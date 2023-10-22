import React from 'react';
import styles from './moderator.module.css';

// Define a React functional component called ModeratorLogin
const ModeratorLogin = ({ handleModeratorLogout, moderatorPassword, setModeratorPassword, isModeratorLoggedIn, handleModeratorLogin }) => {
    return (
        <div className={styles.moderatorLoginContainer}>
            {/* Conditionally render text and button label based on moderator login state */}
            {isModeratorLoggedIn ? (
                // Render this content if the moderator is already logged in
                <>
                    <h1 className={styles.moderatorLogoutTitle}>Moderator Logged In</h1>
                    <button onClick={handleModeratorLogout} className={styles.moderatorLoginButton}>
                        Logout
                    </button>
                </>
            ) : (
                // Render this content if the moderator is not logged in
                <>
                    <h1 className={styles.moderatorLoginTitle}>Moderator Login </h1>
                    <h5>(password is 1234)</h5>
                    <input type="password" value={moderatorPassword} onChange={(e) => setModeratorPassword(e.target.value)} className={styles.moderatorLoginInput} />
                    <button onClick={handleModeratorLogin} className={styles.moderatorLoginButton}>
                        Login
                    </button>
                </>
            )}
        </div>
    );
};

export default ModeratorLogin;
