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

// Copy a quiz by its ID
export const copyQuiz = async (quizId) => {
    try {
      const quizToCopy = await QuizModel.findById(quizId);
      if (!quizToCopy) {
        throw new Error('Quiz not found');
      }
      // Convert the Mongoose document to a plain JavaScript object
      const quizObject = quizToCopy.toObject();
      // Remove the _id property to ensure MongoDB assigns a new one
      delete quizObject._id;
      // Also, ensure to remove any _id fields from embedded documents if present
      quizObject.questions.forEach(question => delete question._id);
      // Create a new quiz model instance with the copied quiz object
      const copiedQuiz = new QuizModel(quizObject);
      // Optional: Modify the title or any other property to indicate it's a copy
      copiedQuiz.title = `Copy of ${copiedQuiz.title}`;
      // Save the new quiz to the database
      const savedQuiz = await copiedQuiz.save();
      return savedQuiz;
    } catch (error) {
      throw error;
    }
  };  
  