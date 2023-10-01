import mongoose from 'mongoose';

// Placeholder model, used to test database functionality


const UserSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);