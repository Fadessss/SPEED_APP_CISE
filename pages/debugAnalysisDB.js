import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DebugAnalysisDB() {
    const [resultMessage, setResultMessage] = useState('');

    const dropCollection = async () => {
        try {
            const res = await axios.post('/api/dropCollection', { collectionName: 'analyses' });

            if (res.status === 200) {
                setResultMessage('Collection Dropped Successfully');
            } else {
                setResultMessage('Failed to Drop Collection');
            }
        } catch (err) {
            console.error('An error occurred while dropping collection', err);
            setResultMessage('An error occurred while dropping collection');
        }
    };

    return (
        <div>
            <button onClick={dropCollection}>Drop Collection</button>
            <p>{resultMessage}</p>
        </div>
    );
}
