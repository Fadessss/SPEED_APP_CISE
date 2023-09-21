require('dotenv').config();
import mongoose from 'mongoose';
import User from '../../models/user';

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
  await connectToDatabase();

  // Define data model here

  try {
    const result = await User.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};