import mongoose from 'mongoose';
import analysisSchema from '../../models/analysisSchema';

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
    console.log('Received request:', req.body);
    await connectToDatabase();

    try {
        const result = await analysisSchema.create(req.body.data);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};
