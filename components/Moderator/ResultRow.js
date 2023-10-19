//ResultRow.js
import React, { useState, useEffect } from 'react';
// Import the styles for the search module
import styles from './search.module.css';
import axios from 'axios';



// Declaration of ResultRow functional component
// It takes result, setShowPopup, setSelectedResult, setShowRatingPopup as props
const ResultRow = ({ buttonText, onAnalysisPage, isAnalystLoggedIn, result, onModeratorPage, isModeratorLoggedIn, setShowPopup, setSelectedResult, setShowRatingPopup, analysisOnClickFunction, deleteArticleOnClickFunction }) => {

    const [isDuplicate, setIsDuplicate] = useState(null);

    useEffect(() => {
        checkDuplicates();
     }, []);
  
     const checkDuplicates = async () => {
        try {
           const response = await axios.post('/api/checkDuplicateInAnalyses', { title: result.title, authors: result.authors, yearOfPublication: result.yearOfPublication });
  
           if (response.data.isDuplicate) {
              setIsDuplicate("DUPLICATE FOUND");
           } else {
              setIsDuplicate(" ");
           }
        } catch (err) {
           console.error('Failed to check duplicates:', err); 
        }
     };
    // The component returns a table row (tr) element
    return (
        // Add a CSS class to the tr element
        <tr className={styles.tableRow}>
            {/* Create a table data (td) element for each property of the result object and add a CSS class to them */}
            {/* Display the contents of the properties inside the td elements */}
            <td className={styles.tableData}>{result.title}</td>
            <td className={styles.tableData}>{result.authors}</td>
            <td className={styles.tableData}>{result.yearOfPublication}</td>
            <td className={styles.tableData}>{result.journalOrConferenceName}</td>
            <td className={styles.tableData}>{result.SEPractice}</td>
            <td className={styles.tableData}>{result.claim}</td>
            <td className={styles.tableData}>{result.resultOfEvidence}</td>
            <td className={styles.tableData}>{result.typeOfResearch}</td>
            <td className={styles.tableData}>{result.typeOfParticipant}</td>
            <td className={styles.tableData}>{isDuplicate}</td>
            {/* Create a button that, when clicked, sets the showPopup state variable to true and the selectedResult state variable to the current result */}

            {isModeratorLoggedIn && !onModeratorPage && (
                <>
                    <td>
                        <button
                            onClick={() => analysisOnClickFunction(result)}
                            disabled={result.analysisStatus === 'Sent'} // Disable the button when the status is 'Sent'
                        >
                            {result.analysisStatus === 'Sent' ? 'Sent' : 'Send'}
                        </button>

                    </td>
                    <td>
                        <button onClick={() => deleteArticleOnClickFunction(result)}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
};
// Export the ResultRow component as the default export of this module
export default ResultRow;
