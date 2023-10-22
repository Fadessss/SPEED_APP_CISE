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
        // Retrieve specific fields from the "SEPractice" collection
        const results = await SEPractice.find({}, "title authors yearOfPublication journalOrConferenceName SEPractice claim resultOfEvidence typeOfResearch typeOfParticipant"); 

        // Log the fetched results
        console.log('Results fetched:', results);

        // Respond with the results in JSON format
        res.json(results);
    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error in fetchAllResults:', err); // Log the error
        res.status(400).json({ error: err });
    }
};
