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
  const [averageRating, setAverageRating] = useState(null);

  const submitRating = async () => {
    try {
      await saveRating(selectedResult._id, userRating);
      const newAverageRating = await fetchAverageRating(selectedResult._id);
      
      setAverageRating(newAverageRating.toFixed(2)); // Limit to 2 decimal places
      
      toast.success('Rating saved successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error while saving the rating:', error);
      toast.error('Error saving the rating', {
        position: 'top-left',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (showRatingPopup) {
      setAverageRating(null); // Reset average rating when the popup is displayed
    }
  }, [showRatingPopup]);

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
      </div>
    ) : null
  );
}

export default RatingPopup;
