import React from 'react'
import styles from './search.module.css';

const ResultRow = ({ result, setShowPopup, setSelectedResult, setShowRatingPopup }) => {
  //...data to be shown in the row
  return (
    <tr className={styles.tableRow}>
            {/* table columns */}
            <td className={styles.tableData}>{result.title}</td>
            <td className={styles.tableData}>{result.authors}</td>
            <td className={styles.tableData}>{result.year}</td>
            <td className={styles.tableData}>{result.journal}</td>
            <td className={styles.tableData}>{result.SEpractice}</td>
            <td className={styles.tableData}>{result.claim}</td>
            <td className={styles.tableData}>{result.result}</td>
            <td className={styles.tableData}>{result.research}</td>
            <td className={styles.tableData}>{result.participant}</td>
            {/* Summary button */}
            <td className={styles.tableData}>
              <button onClick={() => { setShowPopup(true); setSelectedResult(result); }}>Summary</button>
            </td>
            <td className={styles.tableData}>
              <button onClick={() => { setShowRatingPopup(true); setSelectedResult(result); }}>Rate</button>
            </td>
          </tr>
  );
}
export default ResultRow;