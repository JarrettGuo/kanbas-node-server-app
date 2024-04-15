import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  id: { type: String},
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  course: { type: String, required: true },
  points: Number,
}, { collection: 'assignments' });

export default mongoose.model('Assignment', assignmentSchema);
