
import mongoose from 'mongoose';

const RedWineSchema = new mongoose.Schema({
  title: {
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
});


export default mongoose.models.RedWine || mongoose.model('RedWine', RedWineSchema);
