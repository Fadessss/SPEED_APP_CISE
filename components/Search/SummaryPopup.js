import React from 'react'
import styles from './search.module.css';

const SummaryPopup = ({ selectedResult, setShowPopup, showPopup }) => {
  //...details to be shown in the popup
  return (
    showPopup ? (
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article.
            <br /><br />
            Eg. {selectedResult.title} demonstrates evidence which {selectedResult.result}s that {selectedResult.SEpractice} {selectedResult.claim}.
            <br /><br />
            The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}.
          </p>
        </div> ) : null
  );
}
export default SummaryPopup;
