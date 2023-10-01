import React from 'react'
import styles from './search.module.css';

const ResultHeader = ({ sortConfig, setSortConfig }) => {
  //...columns to be shown in the header
  return (
    <tr className={styles.tableRow}>
          {/* Adding onClick events for sorting */}
          <th className={sortConfig.key === "title" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'title', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Title</th>
          <th className={sortConfig.key === "authors" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'authors', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Authors</th>
          <th className={sortConfig.key === "year" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'year', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Year</th>
          <th className={sortConfig.key === "journal" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'journal', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Journal</th>
          <th className={sortConfig.key === "SEpractice" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'SEpractice', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>SE Practice</th>
          <th className={sortConfig.key === "claim" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'claim', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Claim</th>
          <th className={sortConfig.key === "result" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'result', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Result</th>
          <th className={sortConfig.key === "research" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'research', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Research</th>
          <th className={sortConfig.key === "participant" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'participant', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Participant</th>
          <th>Summary</th>
          <th>Rate</th>
        </tr>
  );
}
export default ResultHeader;


