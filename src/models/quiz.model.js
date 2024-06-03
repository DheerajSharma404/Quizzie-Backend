import mongoose from "mongoose";

// Option schema for Q&A type
const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      required: function () {
        return this.optionType === "Text";
      },
    },
    image: {
      type: String,
      required: function () {
        return this.optionType === "Image";
      },
    },
    selectedCount: { type: Number, default: 0 }, // For PollType questions
  },
  { _id: false }
);

// Question schema
const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    question: { type: String, required: true },
    timer: {
      type: Number,
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: function (v) {
          return v.length >= 2 && v.length <= 4;
        },
        message: "Options array must contain between 2 and 4 options.",
      },
      required: true,
    },
    correctAnswer: {
      type: String,
    },
    attemptedCount: { type: Number, default: 0 },
    correctlyAnsweredCount: { type: Number, default: 0 },
    incorrectlyAnsweredCount: { type: Number, default: 0 },
  },
  { _id: false }
);

// Quiz schema
const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quizName: { type: String, required: true },
    quizType: {
      type: String,
      enum: ["Q & A", "Poll Type"],
      required: true,
    },
    optionType: {
      type: String,
      enum: ["Text", "Image URL", "Text & Image URL"],
      required: true,
    },

    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "Questions array must contain between 1 and 5 questions.",
      },
      required: true,
    },
    impressionCount: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to apply quizType to question schema
QuizSchema.pre("validate", function (next) {
  this.questions.forEach((question) => {
    question.quizType = this.quizType;
  });
  next();
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;

//Sample json data

//Q&A Quiz.
// {
//   "userId": "60d5ec49f6d0f88c34d8f3c1" // Example user ID
//   "quizName": "General Knowledge Quiz",
//   "quizType": "Q&A",
//   "optionType": "text and image",
//   "timer": 30,
//   "questions": [
//     {
//       "question": "What is the capital of France?",
//       "options": [
//         { "text": "Berlin", "image": "url_to_berlin.jpg" },
//         { "text": "Madrid", "image": "url_to_madrid.jpg" },
//         { "text": "Paris", "image": "url_to_paris.jpg" },
//         { "text": "Rome", "image": "url_to_rome.jpg" }
//       ],
//       "correctAnswer": 2,
//       "attemptedCount": 100,
//       "correctlyAnsweredCount": 80,
//       "incorrectlyAnsweredCount": 20
//     },
//     {
//       "question": "Which image shows the Eiffel Tower?",
//       "options": [
//         { "text": "Option 1", "image": "url_to_image_1.jpg" },
//         { "text": "Option 2", "image": "url_to_image_2.jpg" },
//         { "text": "Option 3", "image": "url_to_image_3.jpg" },
//         { "text": "Option 4", "image": "url_to_image_4.jpg" }
//       ],
//       "correctAnswer": 1,
//       "attemptedCount": 90,
//       "correctlyAnsweredCount": 70,
//       "incorrectlyAnsweredCount": 20
//     }
//   ],
//   "impressionCount": 150,
// }

//PollType Quiz
// {
//   "userId": "60d5ec49f6d0f88c34d8f3c1" // Example user ID
//   "quizName": "Favorite Color Poll",
//   "quizType": "PollType",
//   "optionType": "text",
//   "questions": [
//     {
//       "question": "What is your favorite color?",
//       "options": [
//         { "text": "Red", "selectedCount": 50 },
//         { "text": "Blue", "selectedCount": 70 },
//         { "text": "Green", "selectedCount": 30 },
//         { "text": "Yellow", "selectedCount": 20 }
//       ],
//       "attemptedCount": 100
//     }
//   ],
//   "impressionCount": 150,
// }
