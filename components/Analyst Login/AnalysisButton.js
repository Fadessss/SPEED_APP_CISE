import React, { useState, useEffect } from 'react';

const AnalysisButton = ({ onClick, text }) => {
    const [updatedText, setUpdatedText] = useState(text);

    useEffect(() => {
        // This useEffect runs on each component update
        setUpdatedText(`${text}`);
    }, [text]); // Only re-run the effect if the 'text' prop changes

    return <button onClick={onClick}>{updatedText}</button>;
};

export default AnalysisButton;
