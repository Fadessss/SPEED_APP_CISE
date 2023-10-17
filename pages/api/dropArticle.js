//dropArticle.js
import mongoose from 'mongoose';
import SEPractice from '../../models/speedSchema';

require('dotenv').config();

const URI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDb;

function connectToDatabase() {
    if (cachedDb) {
        return Promise.resolve(cachedDb);
    } else {
        console.log('Connection success')
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
    const { articleId }  = req.params; // extract articleId from request parameters

    await connectToDatabase();

    try {
       const sePractice = await SEPractice.findById(articleId)

       if (!sePractice) {
            res.status(404).json({ error: 'Article not found.' });
            return;
        }

        // Now we know for sure the article exists
        const deleteResult = await SEPractice.findByIdAndDelete(articleId)

        res.status(204).send(); // 204 indicates a successful request with no response body

    } catch (err) {
        console.error('Error deleting article:', err); // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while deleting the article.' });
    }
};
