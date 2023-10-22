import React from 'react';
import styles from '../ModeratorLogin/moderator.module.css';

const ModeratorLogin = ({ handleModeratorLogout, moderatorPassword, setModeratorPassword, isModeratorLoggedIn, handleModeratorLogin }) => {
    return (
        <div className={styles.moderatorLoginContainer}>
            {/* Conditionally render text and button label based on moderator login state */}
            {isModeratorLoggedIn ? (
                <>
                    <h1 className={styles.moderatorLogoutTitle}>Moderator Logged In</h1>
                    <button onClick={handleModeratorLogout} className={styles.moderatorLoginButton}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <h1 className={styles.moderatorLoginTitle}>Moderator Login <h5>(password is 1234)</h5></h1>
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
