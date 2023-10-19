import mongoose from 'mongoose';
import Articles from '../../models/articlesSchema';

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
    await connectToDatabase();

    try {
        const results = await Articles.find({},"title authors yearOfPublication journalOrConferenceName SEPractice claim resultOfEvidence typeOfResearch typeOfParticipant"); 

        console.log('Results fetched:', results); // Log the results

        res.json(results);
    } catch (err) {
        console.error('Error in fetchAllResults:', err); // Log the error
        res.status(400).json({ error: err });
    }
};