import React from 'react'
import styles from './search.module.css';

// React functional component for a popup that allows users to rate an item
const RatingPopup = ({ 
  // required props
  selectedResult,       // selected item to be rated
  setShowRatingPopup,   // function to show/hide popup
  showRatingPopup,      // boolean indicating whether to show the popup
  userRating,           // current rating provided by the user
  setUserRating,        // function to set the user rating
  submitRating,         // function to submit the rating
  averageRating         // average rating of the item
 }) => {
  
  // Component returns a popup with a drop-down to select rating, a button to submit the rating and current average rating
  return (
    // popup is shown/hidden based on the boolean 'showRatingPopup'
    showRatingPopup ? (
        <div className={styles.popup}>
          // closeButton to close the popup
          <button className={styles.closeButton} onClick={() => setShowRatingPopup(false)}>X</button>
          
          // header shows the title of the item to be rated
          <h2>Rate {selectedResult.title}</h2>
          
          // drop-down to select a rating between 1 and 5
          <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          
          // button to submit the current selected rating
          <button onClick={submitRating}>Submit Rating</button>
          
          // displays the current average rating of the item
          // shown only when averageRating is not null
          {averageRating !== null && (
            <p>The article&apos;s average rating is {averageRating}</p>
          )}
        </div> ) : null
  );
}

export default RatingPopup;