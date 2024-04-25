import mongoose from "mongoose";

// Define the quiz model, including title, course ID, description, type, publication status, publication date, etc.
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Quiz title
  courseId: { type: String, required: true }, // Course ID the quiz belongs to
  description: String, // Quiz description
  type: { // Quiz Type - Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
    type: String,
    enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
    default: "Graded Quiz",
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel' }],
  assignmentGroup:{ //Assignment Group - Quizzes (default), Exams, Assignments, Project
    type: String,
    enum:["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes"
  },
  points: { type: Number, default: 100 }, // Total points
  isPublished: { type: Boolean, default: false }, // Whether the quiz is published
  publishedDate: { // Publication date, set only when the quiz is published
    type: Date,
    required: function() { return this.isPublished; }
  },
  dueDate: Date, // Due date
  availableDate: Date, // Start date
  untilDate: Date, // End date
  shuffleAnswers: { type: Boolean, default: true }, // Whether to shuffle answer order, default is true
  timeLimit: { type: Number, default: 1200 }, // Time limit
  multipleAttempts: { type: Boolean, default: false }, // Whether multiple attempts are allowed
  showCorrectAnswers: Boolean, // Whether to show correct answers
  accessCode: { type:String, default:''}, // Access code
  oneQuestionAtATime: { type: Boolean, default: true }, // Whether to show one question at a time
  webcamRequired: { type: Boolean, default: false }, // Whether a webcam is required
  lockQuestionsAfterAnswering: { type: Boolean, default: false }, // Whether to lock questions after answering
}, { collection: "quizzes" }); // Specify the collection to store documents in as "quizzes"

export default mongoose.model("QuizModel", quizSchema); // Export the model
