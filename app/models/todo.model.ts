import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  isDeleted :{ type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);