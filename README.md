### QuizModel Documentation

### Overview

`QuizModel` represents the structure for creating and managing quizzes within a course system. It incorporates various settings and configurations that define the characteristics and behavior of quizzes.

### Schema Properties

- **title** (String, required): Title of the quiz.
- **courseId** (String, required): Identifier for the course to which the quiz is associated.
- **description** (String): A brief description of the quiz.
- **type** (String): Defines the type of the quiz. Possible values include:
    - Graded Quiz
    - Practice Quiz
    - Graded Survey
    - Ungraded Survey
    Default value is "Graded Quiz".
- **questions** (Array of ObjectIds, references `QuestionModel`): List of questions included in the quiz.
- **assignmentGroup** (String): Categorizes the quiz under different educational activities like Quizzes, Exams, Assignments, or Projects. Default is "Quizzes".
- **isPublished** (Boolean): Indicates if the quiz is currently available to users. Default is `false`.
- **publishedDate** (Date): Date when the quiz is published. Required only if `isPublished` is true.
- **dueDate** (Date): The deadline by which the quiz must be completed.
- **availableDate** (Date): Start date from when the quiz becomes available.
- **untilDate** (Date): End date after which the quiz is no longer available.
- **shuffleAnswers** (Boolean): Whether the answer choices should be shuffled. Default is true.
- **timeLimit** (Number): Duration in minutes that the participant has to complete the quiz.
- **multipleAttempts** (Boolean): Whether the quiz allows multiple attempts. Default is `false`.
- **showCorrectAnswers** (Boolean): Whether correct answers are shown after quiz completion.
- **accessCode** (String): Optional code required to access the quiz.
- **oneQuestionAtATime** (Boolean): Whether questions are displayed one at a time. Default is true.
- **webcamRequired** (Boolean): Whether participation requires a webcam. Default is `false`.
- **lockQuestionsAfterAnswering** (Boolean): Whether questions are locked after answering. Default is `false`.

### QuestionModel Documentation

### Overview

`QuestionModel` defines the structure and content of questions that can be part of quizzes in the system.

### Schema Properties

- **quizId** (ObjectId, references `QuizModel`): Identifier for the quiz this question belongs to.
- **type** (String): Type of the question. Possible values:
    - MULTIPLE_CHOICE
    - TRUE_FALSE
    - FILL_IN_BLANKS
    Default is "MULTIPLE_CHOICE".
- **title** (String, required): Title or main text of the question.
- **points** (Number): Points awarded for correctly answering the question.
- **description** (String): The full text of the question.
- **choices** ([String]): Options for MULTIPLE_CHOICE questions.
- **correct** ([String]): Answers considered correct. Can support multiple correct answers.
