import mongoose from "mongoose";

const wineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Wine || mongoose.model("Wine", wineSchema);
