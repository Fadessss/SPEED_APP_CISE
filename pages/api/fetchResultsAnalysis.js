import mongoose from 'mongoose';
import Analysis from '../../models/analysisSchema';

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

    const { topic, claim } = req.body;

    // Print out the topic and claim strings
    console.log(`Searching in the database for topic: ${topic} and claim: ${claim}`);

    try {
        const results = await Analysis.find(
            { SEPractice: topic, claim: claim },
            'title authors yearOfPublication journalOrConferenceName SEPractice claim resultOfEvidence typeOfResearch typeOfParticipant analysisStatus'
        );

        console.log('Results fetched:', results); // Log the results

        res.json(results);
    } catch (err) {
        console.error('Error in fetchAllResults:', err); // Log the error
        res.status(400).json({ error: err });
    }
};
