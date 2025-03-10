import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // store as Date type
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use existing model or create a new one
export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
