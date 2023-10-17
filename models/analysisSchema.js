import mongoose from 'mongoose';

//Model of schema used for SPEED database

//Must restart page (either local or on vercel) to see changes to enumerated fields
//and other changes in here as this is cached.

const AnalysisSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    authors: {
        type: [String],
        required: false,
    },
    journalOrConferenceName: {
        type: String,
        required: false,
    },
    yearOfPublication: {
        type: Number,
        required: false,
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
        required: false,
    },
    claim: {
        type: String,
        required: false,
    },
    resultOfEvidence: {
        type: String,
        enum: ['Agree', 'Disagree'], // enum used to limit to specified values
        required: false,
    },
    typeOfResearch: {
        type: String,
        enum: ['Case Study', 'Experiment', 'Survey', 'Interview'], // enum used to limit to specified values
        required: false,
    },
    typeOfParticipant: {
        type: String,
        enum: ['Student', 'Practitioner'], // enum used to limit to specified values
        required: false,
    },
    analysisStatus: {
        type: String,
        enum: ['Awaiting', 'Completed'],
        required: false,
    },
    analysisSummary: {
        type: String,
        required: false,
    },
});

export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
