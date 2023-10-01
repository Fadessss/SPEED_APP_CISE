import React from 'react'
import styles from './search.module.css';

// Function component for the summary popup which displays the selected result's details.
const SummaryPopup = ({ selectedResult, setShowPopup, showPopup }) => {

  // The component returns a popup box with details if 'showPopup' is true. Otherwise, it returns null.
  return (
    // Ternary operator that checks if 'showPopup' is true.
    showPopup ? (
        // If 'showPopup' is true, a div with class name 'styles.popup' is returned.
        <div className={styles.popup}>
          {/* The close button in the top right corner of the popup. Clicking this button will set 'showPopup' to 'false', hiding the popup */}
          <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
          {/* The title of the selected result is displayed along with its year of publication and authors. */}
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          {/* A summary paragraph which prints out details about the selectedResult. */}
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article.
            <br /><br />
            {/* An example sentence displaying usage of the selected result's properties. */}
            Eg. {selectedResult.title} demonstrates evidence which {selectedResult.result}s that {selectedResult.SEpractice} {selectedResult.claim}.
            <br /><br />
            {/* Additional details about the selectedResult. */}
            The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}.
          </p>
        </div> ) : null  // If 'showPopup' is false, null is returned, resulting in no output
  );
}

// The function component 'SummaryPopup' is exported for use in other parts of the application.
export default SummaryPopup;