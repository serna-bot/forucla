import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: Image },
  id: { type: String },
});

export default mongoose.model('User', userSchema);
