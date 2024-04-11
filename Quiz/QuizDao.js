import QuizModel from './QuizModel.js';

// 创建新测验
export const createQuiz = (quiz) => QuizModel.create(quiz);

// 查找所有测验
export const findAllQuizzes = () => QuizModel.find();

// 根据ID查找单个测验
export const findQuizById = (quizId) => QuizModel.findById(quizId);

// 更新指定ID的测验
export const updateQuiz = (quizId, quiz) => QuizModel.updateOne({ _id: quizId }, { $set: quiz });

// 删除指定ID的测验
export const deleteQuiz = (quizId) => QuizModel.deleteOne({ _id: quizId });
