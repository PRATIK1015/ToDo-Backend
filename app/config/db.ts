import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL!, {
      serverSelectionTimeoutMS: 10000,
    });
    logger.info(`MongoDB connected successfully.`);
  } catch (error:any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};