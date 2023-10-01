// Import dotenv package to use .env file
require('dotenv').config();

// Import mongoose for MongoDB object modeling and User schema model
import mongoose from 'mongoose';
import User from '../../models/user';

// MongoDB connection string and database name from environment variables
const URI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Cached database instance
let cachedDb;

// Connect to the database using cached instance if available, else create a new one
function connectToDatabase() {
  if (cachedDb) {
    // Use cached database instance if available
    return Promise.resolve(cachedDb);
  } else {
    // Create new database connection
    return mongooseConnect();
  }
}

// Async function to connect to MongoDB using mongoose
async function mongooseConnect() {
  // Wait until mongoose connects to MongoDB
  await mongoose.connect(URI, {
    dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Save database client to cache
  cachedDb = mongoose.connections[0].client;
  // Return connected database
  return cachedDb;
}

// Export default async function as API route to handle HTTP requests
export default async (req, res) => {
  // Wait until connection to the database has been established
  await connectToDatabase();

  try {
    // Create a new User document in MongoDB using request body data
    const result = await User.create(req.body);
    // Send back created User document as JSON response
    res.json(result);
  } catch (err) {
    // If error occurred during document creation, send HTTP 400 status code with error info
    res.status(400).json({ error: err });
  }
};