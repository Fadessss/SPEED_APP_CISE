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
    // Connect to the database
    await connectToDatabase();

    try {
        // Find all entries in the "SEPractice" collection and fetch the "SEPractice" and "claim" fields
        const practices = await SEPractice.find({}, 'SEPractice claim'); 

        // Create sets to store unique topics and claims by mapping the practices
        const topicsSet = new Set(practices.map(practice => practice.SEPractice));
        const claimsSet = new Set(practices.map(practice => practice.claim));

        // Respond with the unique topics and claims in JSON format
        res.json({ topics: [...topicsSet], claims: [...claimsSet] });
    } catch (err) {
        // Handle errors and respond with an error message
        res.status(400).json({ error: err });
    }
};
