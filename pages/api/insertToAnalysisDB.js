// Import necessary libraries and models
import mongoose from 'mongoose';
import analysisSchema from '../../models/analysisSchema';

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
    console.log('Received request:', req.body); // Log the received request data

    // Connect to the database
    await connectToDatabase();

    try {
        // Create a new document in the "analysisSchema" collection using the data from the request body
        const result = await analysisSchema.create(req.body);
        
        // Respond with the created result in JSON format
        res.json(result);
    } catch (err) {
        // Handle errors and respond with an error message
        res.status(400).json({ error: err });
    }
};
