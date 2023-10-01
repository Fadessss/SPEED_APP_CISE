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
  const [selectedTopic, setTopic] = useState(topics[0]);
  const [selectedClaim, setClaim] = useState(claims[0]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <h1>SPEED</h1>
        <div>
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
          <h3>Claim</h3>
          <select value={selectedClaim} onChange={(e) => setClaim(e.target.value)}>
            {claims.map((claim) => (
              <option key={claim} value={claim}>
                {claim}
              </option>
            ))}
          </select>
        </div>
        <button>Go</button>
      </div>
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
        </tr>
        {results.map((result, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.tableData}>{result.title}</td>
            <td className={styles.tableData}>{result.authors}</td>
            <td className={styles.tableData}>{result.year}</td>
            <td className={styles.tableData}>{result.journal}</td>
            <td className={styles.tableData}>{result.SEpractice}</td>
            <td className={styles.tableData}>{result.claim}</td>
            <td className={styles.tableData}>{result.result}</td>
            <td className={styles.tableData}>{result.research}</td>
            <td className={styles.tableData}>{result.participant}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Search;