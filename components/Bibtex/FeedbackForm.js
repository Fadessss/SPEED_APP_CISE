import React from 'react';
import styles from './feedback.module.css';

const FeedbackForm = ({ displayMessage }) => {
    let feedbackClass;
    let parsedMessage; // Assuming the JSON data is in the first object

    if (displayMessage === 'err') {
        parsedMessage = 'err';
    } else if (displayMessage) {
        parsedMessage = displayMessage[0];
    } else {
        parsedMessage = null;
    }

    if (!parsedMessage) {
        return null; // Return null if there's no data
    }

    if (parsedMessage === 'err') {
        feedbackClass = `${styles.feedback_box} ${styles.error_message}`;
    } else {
        feedbackClass = `${styles.feedback_box} ${styles.success_message}`;
    }

    // component
    return (
        <div className={styles.feedback_container}>
            <div className={feedbackClass}>
                {parsedMessage === 'err' && <p>Invalid file type</p>}
                {parsedMessage && parsedMessage !== 'err' && (
                    <div>
                        <p>File Uploaded</p>
                    </div>
                )}
                {/* No response message */}
                {!parsedMessage && <p></p>}
            </div>
            {/* Display bibliographic data in a separate box */}
            {parsedMessage.entryType && (
                <div className={styles.bibliographic_box}>
                    <h3>Bibliographic Data:</h3>
                    <p>
                        <strong>Type:</strong> {parsedMessage.entryType}
                    </p>
                    {/* Make Citation Key a clickable link */}
                    <p>
                        <strong>Citation Key:</strong>{' '}
                        <a href={parsedMessage.citationKey} target="_blank">
                            {parsedMessage.citationKey}
                        </a>
                    </p>
                    <p>
                        <strong>Title:</strong> {parsedMessage.entryTags.title}
                    </p>
                    <p>
                        <strong>Abstract:</strong> {parsedMessage.entryTags.abstract}
                    </p>
                    {/* Add more fields as needed */}
                </div>
            )}
        </div>
    );
};

export default FeedbackForm;
