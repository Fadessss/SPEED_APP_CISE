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

    // Get the topic from the route parameter
    const topic = req.query.topic;

    try {
        // Find entries in the "SEPractice" collection related to the selected topic and only fetch the "claim" field
        const practices = await SEPractice.find({ SEPractice: topic }, { claim: 1, _id: 0 });

        // Extract claims from the found practices
        const claims = practices.map(practice => practice.claim);

        // Remove duplicate claims using a Set and convert it back to an array
        const uniqueClaims = [...new Set(claims)];

        // Respond with the unique claims in JSON format
        res.status(200).json(uniqueClaims);
    } catch (err) {
        // Handle errors and respond with an error message
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};
