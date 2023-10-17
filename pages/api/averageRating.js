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
    const { articleId } = req.query;

    await connectToDatabase();

    try {
       const ratings = await Ratings.find({ key: articleId });
       const sum = ratings.reduce((prev, curr) => prev + curr.rating, 0);
       const averageRating = sum / ratings.length;

       res.status(200).json({ averageRating });
    } catch (err) {
       console.error('Error getting average rating:', err);
       res.status(500).json({ error: 'An error occurred while getting the average rating.' });
    }
};