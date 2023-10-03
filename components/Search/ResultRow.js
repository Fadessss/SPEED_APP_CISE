import React from 'react'
// Import the styles for the search module 
import styles from './search.module.css';

// Declaration of ResultRow functional component
// It takes result, setShowPopup, setSelectedResult, setShowRatingPopup as props
const ResultRow = ({ result, setShowPopup, setSelectedResult, setShowRatingPopup }) => {
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
            
            {/* Create a button that, when clicked, sets the showPopup state variable to true and the selectedResult state variable to the current result */}
            <td className={styles.tableData}>
              <button onClick={() => { setShowPopup(true); setSelectedResult(result); }}>Summary</button>
            </td>
            
            {/* Create a button that, when clicked, sets the showRatingPopup state variable to true and the selectedResult state variable to the current result */}
            <td className={styles.tableData}>
              <button onClick={() => { setShowRatingPopup(true); setSelectedResult(result); }}>Rate</button>
            </td>
          </tr>
  );
}
// Export the ResultRow component as the default export of this module
export default ResultRow;