import mongoose from 'mongoose';

const SEPracticeSchema = new mongoose.Schema({
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
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  pages: {
    type: String,
    required: true,
  },
  DOI: {
    type: String,
    required: true,
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
    enum: ['Case Study', 'Experiment'], // enum used to limit to specified values
    required: true,
  },
  typeOfParticipant: {
    type: String,
    enum: ['Student', 'Practitioner'], // enum used to limit to specified values
    required: true,
  },
});

export default mongoose.models.SEPractice || mongoose.model('SEPractice', SEPracticeSchema);