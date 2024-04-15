import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  module: String
});

const moduleSchema = new mongoose.Schema({
  id: { type: String},
  name: { type: String, required: true },
  description: String,
  course: { type: String, required: true },
  lessons: [lessonSchema]
}, { collection: 'modules' });

export default mongoose.model('Module', moduleSchema);