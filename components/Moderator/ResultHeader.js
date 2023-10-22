import React from 'react';
import styles from './search.module.css';

// Component ResultHeader for displaying header of a table in search results
const ResultHeader = ({ isAnalystLoggedIn, sortConfig, setSortConfig, isModeratorLoggedIn}) => {
    // Render the component
    // className determines the styling of the column based on the current sorting configuration
    // onClick event sets the new sorting configuration based on the current one

    return (
        <tr className={styles.tableRow}>
            {/* For each column in the header, sort action is applied */}
            <th
                className={sortConfig.key === 'title' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'title', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Title
            </th>
            <th
                className={sortConfig.key === 'authors' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'authors', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Authors
            </th>
            <th
                className={sortConfig.key === 'yearOfPublication' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'yearOfPublication', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Year
            </th>
            <th
                className={sortConfig.key === 'journalOrConferenceName' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'journalOrConferenceName', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Journal
            </th>
            <th
                className={sortConfig.key === 'SEPractice' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'SEPractice', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                SE Practice
            </th>
            <th
                className={sortConfig.key === 'claim' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'claim', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Claim
            </th>
            <th
                className={sortConfig.key === 'resultOfEvidence' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'resultOfEvidence', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Result
            </th>
            <th
                className={sortConfig.key === 'typeOfResearch' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'typeOfResearch', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Research
            </th>
            <th
                className={sortConfig.key === 'typeOfParticipant' ? styles.columnSort + ' ' + styles[sortConfig.direction] : styles.columnSort}
                onClick={() => setSortConfig({ key: 'typeOfParticipant', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            >
                Participant
            </th>
            {/* Non-sortable columns */}
            <th>Duplicate check</th>
            {isModeratorLoggedIn &&  <th>Send to Analysis</th>}
            {isModeratorLoggedIn &&  <th>Delete Article</th>}
        </tr>
    );
};
// Export for use in other components
export default ResultHeader;
