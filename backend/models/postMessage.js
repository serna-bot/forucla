import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  channel: String,
  upvoteCount: {
    type: [String],
    default: [],
  },
  downvoteCount: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;
