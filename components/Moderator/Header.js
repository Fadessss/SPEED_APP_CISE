import React from "react"; // Import the necessary React libraries.
import styles from "./search.module.css"; // Import styling from a CSS module.

// Declare a functional component called Header and destructuring relevant props from the parent component.
const Header = ({ selectedTopic, setTopic, selectedClaim, setClaim, topics, claims, onGo, onAll }) => {
    return (
        // Use a div to wrap all elements and apply some styles from the imported CSS module.
        <div className={styles.searchBar}>
            {/* Render a heading text. */}
            <h1>SPEED - Moderator Page</h1>

            {/* Render a topic selection box. */}
            <div>
                {/* Render a subheading text for the topic select box. */}
                <h3>Topic</h3>
                {/* This select element renders a drop-down list of topics. 
        It uses the selectedTopic state as its current value and calls the setTopic function when a new option is selected. */}
                <select aria-label="Topic" value={selectedTopic} onChange={(e) => setTopic(e.target.value)}>
                    {/* // Map each topic in the topics array to an option in the select drop-down. */}
                    {topics.map((topic) => (
                        // Use the topic value itself as the key and display text.
                        <option key={topic} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render a claim selection box. */}
            <div>
                {/* Render a subheading text for the claim select box. */}
                <h3>Claim</h3>
                {/* This select element renders a drop-down list of claims. 
        It uses the selectedClaim state as its current value and calls the setClaim function when a new option is selected. */}
                <select aria-label="Claim" value={selectedClaim} onChange={(e) => setClaim(e.target.value)}>
                    {/*Map each claim in the claims array to an option in the select drop-down. */}
                    {claims.map((claim) => (
                        // Use the claim value itself as the key and display text.
                        <option key={claim} value={claim}>
                            {claim}
                        </option>
                    ))}
                </select>
            </div>
            {/* Render a Go button for initiating searches. */}
            <button onClick={onGo}>Go</button>
            {/* New All button */}
            <button onClick={onAll}>All</button>
        </div>
    );
};
// Export the Header component as the default export for this module.
export default Header;
