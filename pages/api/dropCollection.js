import mongoose from 'mongoose';

require('dotenv').config();

const URI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDb;

function connectToDatabase() {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  } else {
    return mongooseConnect();
  }
}

async function mongooseConnect() {
  await mongoose.connect(URI, {
    dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedDb = mongoose.connections[0].client;
  return cachedDb;
}

export default async (req, res) => {
  const { collectionName } = req.body; // extract collectionName from request body

  await connectToDatabase();

  try {
    // drop the collection
    await mongoose.connection.db.dropCollection(collectionName);
    
    res.json({ message: 'Collection dropped successfully.' });
  } catch (err) {
    res.status(400).json({ error: `An error occurred: ${err}` });
  }
};