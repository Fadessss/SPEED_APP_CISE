import axios from 'axios';

export const saveRating = async (articleId, rating) => {
    try {
        const response = await axios.post('/api/saveRating', {
          key: articleId,
          rating,
        });

        return response.data;
    } catch (err) {
        console.error('Failed to save rating:', err);
        throw err;
    }    
}

export const fetchAverageRating = async (articleId) => {
    try {
        const response = await axios.get('/api/averageRating', {
          params: { articleId }
        });
  
        return response.data.averageRating;
    } catch (err) {
        console.error('Failed to fetch average rating:', err);
        throw err;
    }  
}