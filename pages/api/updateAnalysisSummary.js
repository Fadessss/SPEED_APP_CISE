// Import necessary libraries and the Analysis model
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
    return cachedDb;
}

// Export an asynchronous API endpoint
export default async (req, res) => {
    console.log('Received request:', req.body); // Log the received request data

    // Connect to the database
    await connectToDatabase();

    try {
        // Extract "id" and "analysisSummary" from the request body
        const { id, analysisSummary } = req.body;

        // Update the analysis document by its "id" and set the "analysisSummary" field, returning the updated document
        const result = await analysisSchema.findByIdAndUpdate(id, { analysisSummary }, { new: true });

        // Respond with the updated document
        res.json(result);
    } catch (err) {
        // Handle errors and respond with an error message
        res.status(400).json({ error: err });
    }
};
