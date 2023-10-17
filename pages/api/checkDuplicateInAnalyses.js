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

    const { title, authors, yearOfPublication } = req.body;
    
    try {
        const result = await Analysis.findOne({ title: title, authors: authors, yearOfPublication: yearOfPublication }); 
        
        res.json({isDuplicate: Boolean(result)});
        
    } catch (err) {
        console.error('Error in checkDuplicateInAnalyses:', err); 
        res.status(400).json({ error: err });
    }
};