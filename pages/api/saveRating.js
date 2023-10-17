import mongoose from 'mongoose';
import Ratings from '../../models/ratingSchema';

require('dotenv').config();

const URI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDb;

function connectToDatabase() {
    if (cachedDb) {
        return Promise.resolve(cachedDb);
    } else {
        console.log('Connecting to database...')
        return mongooseConnect();
    }
}

async function mongooseConnect() {
    await mongoose.connect(URI, {
        dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database connection successful')
    cachedDb = mongoose.connections[0].client;
    return cachedDb;
}

export default async (req, res) => {
    const { key, rating } = req.body;

    await connectToDatabase();

    try {
        const newRating = new Ratings({ key, rating });
        await newRating.save();

        res.status(200).json({ message: 'Rating saved successfully.' });
    } catch (err) {
        console.error('Error saving rating:', err);
        res.status(500).json({ error: 'An error occurred while saving the rating.' });
    }
};