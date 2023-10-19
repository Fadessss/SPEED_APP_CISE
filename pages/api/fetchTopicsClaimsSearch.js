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
        const practices = await Articles.find({}, 'SEPractice claim'); 
        const topicsSet = new Set(practices.map(practice => practice.SEPractice));
        const claimsSet = new Set(practices.map(practice => practice.claim));
        res.json({ topics: [...topicsSet], claims: [...claimsSet] });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};