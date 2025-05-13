import mongoose from 'mongoose';

const footballPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});


export default mongoose.models.FootballPost || mongoose.model('FootballPost', footballPostSchema);