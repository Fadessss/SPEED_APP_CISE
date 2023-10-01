import React from 'react';
import styles from './search.module.css';

const Header = ({ selectedTopic, setTopic, selectedClaim, setClaim, topics, claims }) => {
  return (
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
  );
}

export default Header;