// QuestionDao.js
import Question from './QuestionModel.js';

export const createQuestion = (question) => Question.create(question);

export const findQuestionsByQuizId = (quizId) => Question.find({ quizId });

export const updateQuestion = (id, questionData) => {
  return Question.findByIdAndUpdate(id, questionData, { new: true });
};

export const deleteQuestion = (id) => {
  return Question.findByIdAndDelete(id);
};

export const deleteQuestionById = (id) => {
    return Question.findByIdAndDelete(id);
  };
  
  export const findQuestionById = (id) => {
    return Question.findById(id);
};

export const deleteQuestionsByQuizId = (quizId) => {
  // This function will find and delete all questions associated with the provided quizId
  return Question.deleteMany({ quizId: quizId });
};