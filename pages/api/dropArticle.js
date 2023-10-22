// Import necessary libraries and models
import mongoose from 'mongoose';
import SEPractice from '../../models/speedSchema';

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
        console.log('Connection success');
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

    // Cache the client connection
    cachedDb = mongoose.connections[0].client;
    
    // Return the cached database connection
    return cachedDb;
}

// Export an asynchronous API endpoint
export default async (req, res) => {
    // Extract the article ID from the request query
    const { articleId } = req.query;

    // Connect to the database
    await connectToDatabase();

    try {
        // Attempt to find the article by its ID
        const sePractice = await SEPractice.findById(articleId);

        if (!sePractice) {
            // If the article doesn't exist, respond with a 404 status and an error message
            res.status(404).json({ error: 'Article not found.' });
            return;
        }

        // Now we know for sure the article exists, so proceed to delete it
        const deleteResult = await SEPractice.findByIdAndDelete(articleId);

        // Respond with a 204 status, indicating a successful request with no response body
        res.status(204).send();

    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error deleting article:', err); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while deleting the article.' });
    }
};
