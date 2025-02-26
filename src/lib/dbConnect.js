// src/lib/dbConnect.js
import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export async function dbConnect() {
  if (isConnected) {

    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Cannot connect to MongoDB');
  }
}
