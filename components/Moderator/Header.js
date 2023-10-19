import React from "react"; // Import the necessary React libraries.
import styles from "./search.module.css"; // Import styling from a CSS module.

// Declare a functional component called Header and destructuring relevant props from the parent component.
const Header = ({ selectedTopic, setTopic, selectedClaim, setClaim, topics, claims, onGo, onAll }) => {
    return (
        // Use a div to wrap all elements and apply some styles from the imported CSS module.
        <div className={styles.searchBar}>
            {/* Render a heading text. */}
            <h1>SPEED - Moderator Page</h1>
        </div>
    );
};
// Export the Header component as the default export for this module.
export default Header;
