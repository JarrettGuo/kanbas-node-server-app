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
- **points** (Number): The points of quiz. Default is 0.
- **publishedDate** (Date): Date when the quiz is published. Required only if `isPublished` is true.
- **dueDate** (Date): The deadline by which the quiz must be completed.
- **availableDate** (Date): Start date from when the quiz becomes available.
- **untilDate** (Date): End date after which the quiz is no longer available.
- **shuffleAnswers** (Boolean): Whether the answer choices should be shuffled. Default is true.
- **timeLimit** (Number): Duration in minutes that the participant has to complete the quiz. Default is `20minutes`
- **multipleAttempts** (Boolean): Whether the quiz allows multiple attempts. Default is `false`.
- **showCorrectAnswers** (Boolean): Whether correct answers are shown after quiz completion.
- **accessCode** (String): Optional code required to access the quiz. Default is `''`.
- **oneQuestionAtATime** (Boolean): Whether questions are displayed one at a time. Default is `true`.
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


### Endpoints Overview

1. **Create a Quiz**
    - **POST** `/api/quizzes`
    - **Payload Example:**
        
        ```json
        {
          "title": "New Rocket Science Quiz",
          "courseId": "RS102",
          "description": "A quiz on advanced rocket science topics.",
          "type": "Graded Quiz",
          "assignmentGroup": "Quizzes",
          "dueDate": "2024-08-20T00:00:00.000Z",
          "availableDate": "2024-08-01T00:00:00.000Z",
          "untilDate": "2024-09-01T00:00:00.000Z",
          "questions": [
            {
              "type": "MULTIPLE_CHOICE",
              "title": "Advanced Propulsion",
              "points": 10,
              "question": "What is the role of ion thrusters?",
              "choices": ["Propulsion", "Stabilization", "Power generation", "Communication"],
              "correct": ["Propulsion"]
            }
          ]
        }
        
        ```
        
    - **Functionality:** Creates a new quiz with associated questions.
2. **Get All Quizzes**
    - **GET** `/api/quizzes`
    - **Functionality:** Retrieves all quizzes.
3. **Get Specific Quiz by ID**
    - **GET** `/api/quizzes/{quizId}`
    - **Functionality:** Retrieves a specific quiz along with its detailed question list.
4. **Update a Quiz and Its Questions**
    - **PUT** `/api/quizzes/{quizId}`
    - **Payload Example:**
        
        ```json
        {
          "title": "Updated Rocket Propulsion Quiz",
          "description": "Updated description here.",
          "questions": [
            {
              "_id": "questionId",
              "title": "Updated Question Title"
            },
            {
              "type": "TRUE_FALSE",
              "title": "New Question on Safety",
              "points": 4,
              "question": "Is it safe to handle fuel without proper gear?",
              "correct": ["FALSE"]
            }
          ]
        }
        
        ```
        
    - **Functionality:** Updates quiz details and associated questions.
5. **Delete a Quiz**
    - **DELETE** `/api/quizzes/{quizId}`
    - **Functionality:** Deletes the specified quiz and its associated questions.
6. **Publish a Quiz**
    - **PUT** `/api/quizzes/{quizId}/publish`
    - **Functionality:** Marks the quiz as published with the current date as the publication date.
7. **Unpublish a Quiz**
    - **PUT** `/api/quizzes/{quizId}/unpublish`
    - **Functionality:** Marks the quiz as unpublished and removes the publication date.
8. **Copy a Quiz**
    - **POST** `/api/quizzes/{quizId}/copy`
    - **Functionality:** Creates a duplicate of the specified quiz with a new title prefixed by "Copy of".
9. **Delete a Specific Question from a Quiz**
    - **DELETE** `/api/quizzes/{quizId}/questions/{questionId}`
    - **Functionality:** Deletes a specific question from the quiz and updates the quiz's question list.
10. **Get Quizzes by Course ID**
- **GET** `/api/quizzes/course/:courseId`
- **Functionality:** Retrieves a list of quizzes associated with a specific course ID. If no quizzes are found, it returns an error indicating no quizzes are available for the specified course ID. In case of server errors, it provides an appropriate error message.

### Data Structures

- **Quiz Model:** Includes properties such as title, course ID, description, quiz type, assignment group, publication status, and more.
- **Question Model:** Details include question type, title, points, question text, choices, and correct answers.

### Handling Errors

Responses typically include a status code and, in case of errors, an error message:

- **200 OK:** Action was successful
- **201 Created:** Resource was created successfully
- **204 No Content:** Action was successful, no content to return
- **404 Not Found:** Resource was not found
- **500 Internal Server Error:** An error occurred on the server
