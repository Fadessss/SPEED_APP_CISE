import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);