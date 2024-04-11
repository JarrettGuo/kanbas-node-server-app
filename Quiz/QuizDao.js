import QuizModel from './QuizModel.js';

// Create a new quiz
export const createQuiz = (quiz) => QuizModel.create(quiz);

// Find all quizzes
export const findAllQuizzes = () => QuizModel.find();

// Find a single quiz by ID
export const findQuizById = (quizId) => QuizModel.findById(quizId);

// Update a quiz by its ID
export const updateQuiz = (quizId, quiz) => QuizModel.updateOne({ _id: quizId }, { $set: quiz });

// Delete a quiz by its ID
export const deleteQuiz = (quizId) => QuizModel.deleteOne({ _id: quizId });
