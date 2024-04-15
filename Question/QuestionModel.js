// QuestionModel.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel' },
  type: { type: String, enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANKS"], default: "MULTIPLE_CHOICE"},
  title: { type: String, required: true },
  points: Number,
  description: String,
  choices: [String],
  correct: [String]
}, { collection: 'questions' });

export default mongoose.model('QuestionModel', questionSchema);