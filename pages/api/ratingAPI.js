// Import the Axios library for making HTTP requests
import axios from 'axios';

// Function to save a rating for an article
export const saveRating = async (articleId, rating) => {
    try {
        // Send a POST request to the '/api/saveRating' endpoint with the article ID and rating
        const response = await axios.post('/api/saveRating', {
            key: articleId,
            rating,
        });

        // Return the data from the response
        return response.data;
    } catch (err) {
        // Handle errors and log an error message
        console.error('Failed to save rating:', err);
        throw err;
    }    
}

// Function to fetch the average rating for an article
export const fetchAverageRating = async (articleId) => {
    try {
        // Send a GET request to the '/api/averageRating' endpoint with the article ID as a parameter
        const response = await axios.get('/api/averageRating', {
            params: { articleId }
        });
  
        // Return the average rating from the response data
        return response.data.averageRating;
    } catch (err) {
        // Handle errors and log an error message
        console.error('Failed to fetch average rating:', err);
        throw err;
    }  
}
