import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import { saveRating, fetchAverageRating } from '../../pages/api/ratingAPI';
import { toast } from 'react-toastify';

const RatingPopup = ({ 
  selectedResult,
  setShowRatingPopup,
  showRatingPopup,
  userRating,
  setUserRating,
}) => {
  // State to store the average rating of the selected article
  const [averageRating, setAverageRating] = useState(null);

  // Function to submit the user's rating for the article
  const submitRating = async () => {
    try {
      // Save the user's rating in the database
      await saveRating(selectedResult._id, userRating);

      // Fetch and update the new average rating for the article
      const newAverageRating = await fetchAverageRating(selectedResult._id);
      
      // Limit the average rating to two decimal places
      setAverageRating(newAverageRating.toFixed(2));

      // Display a success toast message
      toast.success('Rating saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error while saving the rating:', error);

      // Display an error toast message
      toast.error('Error saving the rating', {
        position: 'top-left',
        autoClose: 3000,
      });
    }
  };

  // Effect to reset the average rating when the popup is displayed
  useEffect(() => {
    if (showRatingPopup) {
      setAverageRating(null);
    }
  }, [showRatingPopup]);

  return (
    // Render the rating popup if showRatingPopup is true, otherwise render nothing
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
          <p>The article's average rating is {averageRating}</p>
        )}
      </div>
    ) : null
  );
}

export default RatingPopup;
