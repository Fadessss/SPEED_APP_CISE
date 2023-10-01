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
  // ... add other dummy results ...
];

function Search() {
  //Topic
  const [selectedTopic, setTopic] = useState(topics[0]);
  //Claim
  const [selectedClaim, setClaim] = useState(claims[0]);
  //show popup
  const [showPopup, setShowPopup] = useState(false);
  //selected result
  const [selectedResult, setSelectedResult] = useState(null);


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
          <th>Title</th>
          <th>Authors</th>
          <th>Year</th>
          <th>Journal</th>
          <th>SE Practice</th>
          <th>Claim</th>
          <th>Result</th>
          <th>Research</th>
          <th>Participant</th>
          <th>Summary</th>
        </tr>
        {results.map((result, index) => (
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
          <button onClick={() => setShowPopup(false)}>X</button>
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article. For example, {selectedResult.claim} was analyzed and researchers found that {selectedResult.result}. The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}. This information provides valuable insights into {selectedResult.SEpractice}.</p>
        </div>
      ) : null}

    </div>
  );
}

export default Search;