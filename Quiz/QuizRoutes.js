import * as quizDao from './QuizDao.js';
import * as questionDao from '../Question/QuestionDao.js';
import Quiz from './QuizModel.js';

export default function QuizRoutes(app) {
  // Create a new quiz and its associated questions - POST http://localhost:4000/api/quizzes
  app.post("/api/quizzes", async (req, res) => {
    try {
      const { questions, ...quizDetails } = req.body;
      const quiz = await quizDao.createQuiz(quizDetails);
      const savedQuestions = await Promise.all(questions.map(question => {
        return questionDao.createQuestion({ ...question, quizId: quiz._id });
      }));
      quiz.questions = savedQuestions.map(q => q._id);
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Get all quizzes - GET http://localhost:4000/api/quizzes
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await quizDao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Get a single quiz by ID including its questions - GET http://localhost:4000/api/quizzes/661bc775197093838381d3c7
  app.get("/api/quizzes/:quizId", async (req, res) => {
    try {
      const quiz = await quizDao.findQuizById(req.params.quizId).populate('questions');
      if (!quiz) {
        res.status(404).json({ error: 'Quiz not found' });
      } else {
        res.json(quiz);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Update a quiz and its questions - PUT http://localhost:4000/api/quizzes/661bc997197093838381d3da
  app.put("/api/quizzes/:quizId", async (req, res) => {
    try {
      const { questions, ...quizDetails } = req.body;
      const updatedQuiz = await quizDao.updateQuiz(req.params.quizId, quizDetails);
      if (questions && questions.length) {
        await questionDao.findQuestionsByQuizId(req.params.quizId).then(existingQuestions => {
          const updates = questions.map(question => {
            if (question._id) {
              return questionDao.updateQuestion(question._id, question);
            } else {
              return questionDao.createQuestion({ ...question, quizId: req.params.quizId });
            }
          });
          return Promise.all(updates);
        });
      }
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Delete a quiz and its corresponding questions - DELETE http://localhost:4000/api/quizzes/661bc84b197093838381d3d1
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    try {
      await quizDao.deleteQuiz(req.params.quizId);
      await questionDao.deleteQuestionsByQuizId(req.params.quizId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Publish a quiz - PUT http://localhost:4000/api/quizzes/661bc997197093838381d3da/publish
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    try {
      const updatedQuiz = await quizDao.updateQuiz(req.params.quizId, {
        isPublished: true,
        publishedDate: new Date()
      });
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Unpublish a quiz - PUT http://localhost:4000/api/quizzes/661bc997197093838381d3da/unpublish
  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    try {
      const updatedQuiz = await quizDao.updateQuiz(req.params.quizId, {
        isPublished: false,
        publishedDate: null
      });
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Copy a quiz - POST http://localhost:4000/api/quizzes/661bc997197093838381d3da/copy
  app.post("/api/quizzes/:quizId/copy", async (req, res) => {
    try {
      const originalQuiz = await quizDao.findQuizById(req.params.quizId);
      if (!originalQuiz) {
        return res.status(404).send('Original quiz not found');
      }
      const quizData = originalQuiz.toObject();
      delete quizData._id;
      quizData.title = `Copy of ${quizData.title}`;
      const newQuiz = await quizDao.createQuiz(quizData);
      const originalQuestions = await questionDao.findQuestionsByQuizId(originalQuiz._id);
      const copiedQuestions = originalQuestions.map(question => ({
        ...question.toObject(),
        quizId: newQuiz._id,
        _id: undefined
      }));
      await questionDao.createQuestion(copiedQuestions);
      res.json(newQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });

  // Delete a specific question - DELETE http://localhost:4000/api/quizzes/661bce8d3c80f91af4be0f6f/questions/661bc997197093838381d3dc
  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    try {
      const { quizId, questionId } = req.params;
      const quiz = await quizDao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      if (!quiz.questions.includes(questionId)) {
        return res.status(404).json({ error: 'Question not found in this quiz' });
      }
      await questionDao.deleteQuestionsByQuizId(questionId);
      quiz.questions = quiz.questions.filter(id => id.toString() !== questionId);
      await quiz.save();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });
  // Get quizzes by courseId - GET http://localhost:4000/api/quizzes/course/:courseId
  app.get("/api/quizzes/course/:courseId", async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const quizzes = await quizDao.findQuizzesByCourseId(courseId);
      if (!quizzes.length) {
        return;
      }
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });
  // Get all questions for a specific quiz by quiz ID - GET http://localhost:4000/api/quizzes/:quizId/questions
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    try {
      const { quizId } = req.params;
      const questions = await questionDao.findQuestionsByQuizId(quizId);
      if (!questions.length) {
        return res.status(404).json({ error: 'No questions found for this quiz.' });
      }
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
  });
}