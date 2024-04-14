// QuizDao.js
import Quiz from './QuizModel.js';

export const createQuiz = async (quizData) => {
    const quiz = new Quiz(quizData);
    return quiz.save();
};

export const findAllQuizzes = () => {
    return Quiz.find();
};

export const findQuizById = (quizId) => {
    return Quiz.findById(quizId);
};

export const updateQuiz = (quizId, quizData) => {
    return Quiz.findByIdAndUpdate(quizId, quizData, { new: true });
};

export const deleteQuiz = (quizId) => {
    return Quiz.deleteOne({ _id: quizId });
};