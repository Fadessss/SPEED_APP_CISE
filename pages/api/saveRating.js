// Import necessary libraries and the Ratings model
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
        console.log('Connecting to database...'); // Log the connection attempt
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
    
    // Log a successful database connection
    console.log('Database connection successful');

    // Cache the client connection
    cachedDb = mongoose.connections[0].client;

    // Return the cached database connection
    return cachedDb;
}

// Export an asynchronous API endpoint
export default async (req, res) => {
    // Extract "key" and "rating" from the request body
    const { key, rating } = req.body;

    // Connect to the database
    await connectToDatabase();

    try {
        // Create a new "Ratings" document with the provided key and rating, then save it
        const newRating = new Ratings({ key, rating });
        await newRating.save();

        // Respond with a success message
        res.status(200).json({ message: 'Rating saved successfully.' });
    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error saving rating:', err); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while saving the rating.' });
    }
};
