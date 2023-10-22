// Import the Mongoose library
import mongoose from 'mongoose';

// Load environment variables from a .env file
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
  cachedDb = mongoose.connections[0].client;
  return cachedDb;
}

// Export an asynchronous API endpoint
export default async (req, res) => {
  // Extract the collection name from the request body
  const { collectionName } = req.body;

  // Connect to the database
  await connectToDatabase();

  try {
    // Drop the specified collection from the database
    await mongoose.connection.db.dropCollection(collectionName);

    // Respond with a success message
    res.json({ message: 'Collection dropped successfully.' });
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(400).json({ error: `An error occurred: ${err}` });
  }
};
