// Import necessary libraries and models
import mongoose from 'mongoose';
import Analysis from '../../models/analysisSchema';

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

    // Extract data from the request body
    const { title, authors, yearOfPublication } = req.body;

    try {
        // Search for a document in the "Analysis" collection with matching criteria
        const result = await Analysis.findOne({ title: title, authors: authors, yearOfPublication: yearOfPublication }); 
        
        // Respond with a JSON object indicating whether a duplicate was found
        res.json({ isDuplicate: Boolean(result) });
        
    } catch (err) {
        // Handle errors and respond with an error message
        console.error('Error in checkDuplicateInAnalyses:', err); 
        res.status(400).json({ error: err });
    }
};
