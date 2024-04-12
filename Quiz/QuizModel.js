import mongoose from "mongoose";

// Define the question model, including question type, title, points, description, options, and correct answers
const questionSchema = new mongoose.Schema({
  type: { // Question type, such as multiple choice, true/false, fill in the blanks, etc.
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANKS"],
    required: true,
  },
  title: { // Question title
    type: String,
    required:true
  },
  points: Number, // Points for the question
  question: String, // Question description
  choices: { // Options for multiple choice questions, required only for multiple choice questions
    type: [String],
    required: function() { return this.type === "MULTIPLE_CHOICE"; }
  },
  correct: { // Correct answer(s), supports scenarios with multiple correct answers
    type: [String],
    required: true
  },
}, { _id: false }); // Disable internal _id generation since questions are embedded as sub-documents

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
  assignmentGroup:{ //Assignment Group - Quizzes (default), Exams, Assignments, Project
    type: String,
    enum:["Quizzes", "Exams", "Assignments", "Project"],
    default: "Quizzes"
  },
  isPublished: { type: Boolean, default: false }, // Whether the quiz is published
  publishedDate: { // Publication date, set only when the quiz is published
    type: Date,
    required: function() { return this.isPublished; }
  },
  questions: [questionSchema], // List of questions included in the quiz
  dueDate: Date, // Due date
  availableDate: Date, // Start date
  untilDate: Date, // End date
  shuffleAnswers: { type: Boolean, default: false }, // Whether to shuffle answer order
  timeLimit: Number, // Time limit
  multipleAttempts: { type: Boolean, default: false }, // Whether multiple attempts are allowed
  showCorrectAnswers: Boolean, // Whether to show correct answers
  accessCode: String, // Access code
  oneQuestionAtATime: { type: Boolean, default: false }, // Whether to show one question at a time
  webcamRequired: { type: Boolean, default: false }, // Whether a webcam is required
  lockQuestionsAfterAnswering: { type: Boolean, default: false }, // Whether to lock questions after answering
}, { collection: "quizzes" }); // Specify the collection to store documents in as "quizzes"

export default mongoose.model("QuizModel", quizSchema); // Export the model
