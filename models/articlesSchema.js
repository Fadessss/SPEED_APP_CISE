import mongoose from 'mongoose';

//Model of schema used for SPEED database

//Must restart page (either local or on vercel) to see changes to enumerated fields
//and other changes in here as this is cached.

const ArticlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    journalOrConferenceName: {
        type: String,
        required: true,
    },
    yearOfPublication: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: false,
    },
    number: {
        type: Number,
        required: false,
    },
    pages: {
        type: String,
        required: false,
    },
    DOI: {
        type: String,
        required: false,
    },
    SEPractice: {
        type: String,
        required: true,
    },
    claim: {
        type: String,
        required: true,
    },
    resultOfEvidence: {
        type: String,
        enum: ['Agree', 'Disagree'], // enum used to limit to specified values
        required: true,
    },
    typeOfResearch: {
        type: String,
        enum: ['Case Study', 'Experiment', 'Survey', 'Interview'], // enum used to limit to specified values
        required: true,
    },
    typeOfParticipant: {
        type: String,
        enum: ['Student', 'Practitioner'], // enum used to limit to specified values
        required: true,
    },
});

export default mongoose.models.Articles || mongoose.model('Articles', ArticlesSchema);