import * as quizDao from './QuizDao.js';
import quizModel from './QuizModel.js';

export default function QuizRoutes(app) {
  // Create a new quiz Example: http://localhost:4000/api/quizzes
  app.post("/api/quizzes", async (req, res) => {
    const quiz = await quizDao.createQuiz(req.body);
    res.json(quiz); // Return the created quiz
  });

  // Get all quizzes, with sorting support Example: http://localhost:4000/api/quizzes
  app.get("/api/quizzes", async (req, res) => {
    let sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1; // Parse sorting parameters
    }
    const quizzes = await quizDao.findAllQuizzes().sort(sort);
    res.json(quizzes); // Return the sorted list of quizzes
  });

  // Get a single quiz by ID Example: http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await quizDao.findQuizById(req.params.quizId);
    res.json(quiz); // Return the quiz for the specified ID
  });

  // Update a quiz by its ID Example: http://localhost:4000/api/quizzes/6616b25b30e0b9d0a5f9b15d
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const status = await quizDao.updateQuiz(req.params.quizId, req.body);
    res.json(status); // Return the update result
  });

  // Delete a quiz by its ID Example: http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const status = await quizDao.deleteQuiz(req.params.quizId);
    res.json(status); // Return the deletion result
  });

  // Publish a quiz Example: http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09/publish
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    try {
      const quiz = await quizModel.findByIdAndUpdate(req.params.quizId, {
        isPublished: true,
        publishedDate: new Date() // Set the publication date
      }, { new: true });
      res.json(quiz); // Return the updated quiz
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.error(error);
    }
  });

  // Unpublish a quiz Example: http://localhost:4000/api/quizzes/6616ab177482a909f4a36c09/unpublish
  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    try {
      const quiz = await quizModel.findByIdAndUpdate(req.params.quizId, {
        isPublished: false,
        publishedDate: null // Clear the publication date
      }, { new: true });
      res.json(quiz); // Return the updated quiz
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all quizzes under a specified course ID Example: http://localhost:4000/api/quizzes?courseId=WD101
  app.get("/api/quizzes", async (req, res) => {
    let query = {};
    let sort = {};

    // Check if there's a courseId query parameter
    if (req.query.courseId) {
      query.courseId = req.query.courseId; // Filter by courseId
    }

    // Check if there's a sorting parameter
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }

    try {
      const quizzes = await quizDao.findAllQuizzes().find(query).sort(sort);
      res.json(quizzes); // Return the filtered and sorted list of quizzes
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
