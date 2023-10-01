import React from 'react';   // Import the necessary React libraries.
import styles from './search.module.css';   // Import styling from a CSS module.

// Declare a functional component called Header and destructuring relevant props from the parent component.
const Header = ({ selectedTopic, setTopic, selectedClaim, setClaim, topics, claims }) => {
  return (
    <div className={styles.searchBar}>   // Use a div to wrap all elements and apply some styles from the imported CSS module.
      <h1>SPEED</h1>   // Render a heading text.

      // Render a topic selection box.
      <div>
        <h3>Topic</h3>   // Render a subheading text for the topic select box.
        <select value={selectedTopic} onChange={(e) => setTopic(e.target.value)}>   // This select element renders a drop-down list of topics. It uses the selectedTopic state as its current value and calls the setTopic function when a new option is selected.
          {topics.map((topic) => (   // Map each topic in the topics array to an option in the select drop-down.
            <option key={topic} value={topic}>   // Use the topic value itself as the key and display text.
              {topic}
            </option>
          ))}
        </select>
      </div>
      
      // Render a claim selection box.
      <div>
        <h3>Claim</h3>   // Render a subheading text for the claim select box.
        <select value={selectedClaim} onChange={(e) => setClaim(e.target.value)}>   // This select element renders a drop-down list of claims. It uses the selectedClaim state as its current value and calls the setClaim function when a new option is selected.
          {claims.map((claim) => (   // Map each claim in the claims array to an option in the select drop-down.
            <option key={claim} value={claim}>   // Use the claim value itself as the key and display text.
              {claim}
            </option>
          ))}
        </select>
      </div>

      <button>Go</button>   // Render a Go button for initiating searches.
    </div>
  );
}

export default Header;   // Export the Header component as the default export for this module.