import React, { useState } from 'react';
import styles from './search.module.css';

// Define your placeholder topics and claims
const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];
const claims = ['Claim 1', 'Claim 2', 'Claim 3', 'Claim 4', 'Claim 5'];

// Dummy data
const results = [
  {
    title: 'Title 1',
    authors: 'Author 1',
    year: '2021',
    journal: 'Journal 1',
    SEpractice: 'SE Practice 1',
    claim: 'Claim 1',
    result: 'Agree',
    research: 'Case Study',
    participant: 'Student',
  },
  {
    title: 'Title 2',
    authors: 'Author 2',
    year: '2022',
    journal: 'Journal 2',
    SEpractice: 'SE Practice 2',
    claim: 'Claim 2',
    result: 'Agree',
    research: 'Investigation',
    participant: 'Researcher',
  }
];

function Search() {
  const [selectedTopic, setTopic] = useState(topics[0]);
  const [selectedClaim, setClaim] = useState(claims[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const sortResults = (results) => {
    let sortedResults = [...results];
    if (sortConfig.direction === 'ascending') {
      sortedResults.sort((a, b) => a[sortConfig.key] > b[sortConfig.key] ? 1 : -1);
    } else {
      sortedResults.sort((a, b) => a[sortConfig.key] < b[sortConfig.key] ? 1 : -1);
    }
    return sortedResults;
  };

  return (
    <div className={styles.container}>
      {/* Header bar */}
      <div className={styles.searchBar}>
        {/* Logo */}
        <h1>SPEED</h1>
        <div>
          {/* Topic with dropdown list */}
          <h3>Topic</h3>
          <select value={selectedTopic} onChange={(e) => setTopic(e.target.value)}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Claim with dropdown list */}
          <h3>Claim</h3>
          <select value={selectedClaim} onChange={(e) => setClaim(e.target.value)}>
            {claims.map((claim) => (
              <option key={claim} value={claim}>
                {claim}
              </option>
            ))}
          </select>
        </div>
        {/* go button (initiates search) */}
        <button>Go</button>
      </div>

      {/* Table of results */}
      <table className={styles.table}>
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
        </tr>
        {/* Using the sortResults function before mapping */}
        {sortResults(results).map((result, index) => (
          <tr key={index} className={styles.tableRow}>
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
          </tr>
        ))}
      </table>

      {/* Summary popup */}
      {showPopup ? (
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article.
          {selectedResult.title} demonstrates evidence which {selectedResult.result}s that {selectedResult.SEpractice} {selectedResult.claim}.
            <br /><br />
            The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}.
            </p>
        </div>
      ) : null}

    </div>
  );
}

export default Search;