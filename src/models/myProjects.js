import mongoose from 'mongoose';

const myProjectsSchema = new mongoose.Schema({
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
  author: {
    type: String,
    required: true,
  },
});


export default mongoose.models.MyProjects || mongoose.model('MyProjects', myProjectsSchema);