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
    const topic = req.query.topic; // get the topic from the route parameter
    try {
        const practices = await Articles.find({ SEPractice: topic }, { claim: 1, _id: 0 }); // find entries with the selected topic 
        const claims = practices.map(practice => practice.claim); // get the claim of each found practice
        const uniqueClaims = [...new Set(claims)]; // remove duplicates
        res.status(200).json(uniqueClaims);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};