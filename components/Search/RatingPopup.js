import React from 'react'
import styles from './search.module.css';

const RatingPopup = ({ selectedResult, setShowRatingPopup, showRatingPopup, userRating, setUserRating, submitRating, averageRating }) => {
  //...details to be shown in the popup
  return (
    showRatingPopup ? (
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={() => setShowRatingPopup(false)}>X</button>
          <h2>Rate {selectedResult.title}</h2>
          <select value={userRating} onChange={(e) => setUserRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
          <button onClick={submitRating}>Submit Rating</button>
          {averageRating !== null && (
            <p>The article&apos;s average rating is {averageRating}</p>
          )}
        </div> ) : null
  );
}
export default RatingPopup;