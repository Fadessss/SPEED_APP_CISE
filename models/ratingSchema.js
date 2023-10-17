import mongoose from 'mongoose';

//Model of schema used for analysis database

//Must restart page (either local or on vercel) to see changes to enumerated fields
//and other changes in here as this is cached.

const ratingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

export default mongoose.models.Ratings || mongoose.model('Ratings', ratingSchema);
