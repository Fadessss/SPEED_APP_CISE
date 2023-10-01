import React, { useState } from 'react';
import styles from './search.module.css';

const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];
const claims = ['Claim 1', 'Claim 2', 'Claim 3', 'Claim 4', 'Claim 5'];

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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
          <th 
             className={styles.columnSort + (sortConfig.key==="title" ? " " + styles[sortConfig.direction] : "")}
             onClick={() => setSortConfig({ key: 'title', direction: sortConfig.direction == 'ascending' ? 'descending' : 'ascending'})}
          >Title</th>
          {/* Similar onClick to be added to all other th elements for their own keys */}
        </tr>
        {sortResults(results).map((result, index) => (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.tableData}>{result.title}</td>
            {/* Other td elements */}
          </tr>
        ))}
      </table>
      {showPopup ? (
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article. 
            For example, {selectedResult.claim} was analyzed and researchers found that {selectedResult.result}. 
            The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}. 
            This information provides valuable insights into {selectedResult.SEpractice}.</p>
        </div>
      ) : null}

    </div>
  );
}

export default Search;