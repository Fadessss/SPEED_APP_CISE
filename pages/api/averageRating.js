// Import necessary libraries and models
import mongoose from 'mongoose';
import Ratings from '../../models/ratingSchema';

// Load environment variables
require('dotenv').config();

// Retrieve MongoDB connection URI and database name from environment variables
const URI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Initialize a cached database connection to avoid repeated connections
let cachedDb;

// Function to connect to the database or return the cached connection
function connectToDatabase() {
    if (cachedDb) {
        return Promise.resolve(cachedDb);
    } else {
        console.log('Connecting to database...');
        return mongooseConnect();
    }
}

// Async function to establish a connection with MongoDB
async function mongooseConnect() {
    // Connect to the MongoDB using Mongoose
    await mongoose.connect(URI, {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    // Log a successful database connection and cache the client
    console.log('Database connection successful');
    cachedDb = mongoose.connections[0].client;
    
    // Return the cached database connection
    return cachedDb;
}

// Export an asynchronous API endpoint
export default async (req, res) => {
    const { articleId } = req.query;

    // Connect to the database
    await connectToDatabase();

    try {
        // Retrieve ratings for a specific article from the database
        const ratings = await Ratings.find({ key: articleId });

        // Calculate the sum of ratings and the average rating
        const sum = ratings.reduce((prev, curr) => prev + curr.rating, 0);
        const averageRating = sum / ratings.length;

        // Respond with the average rating in JSON format
        res.status(200).json({ averageRating });
    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error getting average rating:', err);
        res.status(500).json({ error: 'An error occurred while getting the average rating.' });
    }
};
