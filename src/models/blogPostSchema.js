import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
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

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", blogPostSchema);
