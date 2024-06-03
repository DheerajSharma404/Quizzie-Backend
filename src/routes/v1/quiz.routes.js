import express from "express";
import { QuizController } from "../../controllers/index.js";
import { AuthMiddleware, QuizMiddleware } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", AuthMiddleware.checkAuth, QuizController.getAllQuizzesByUser);
router.post(
  "/create-quiz",
  QuizMiddleware.validateQuiz,
  AuthMiddleware.checkAuth,
  QuizController.createQuiz
);

router.get("/:quizId", QuizController.getQuizById);

router.delete(
  "/delete-quiz/:quizId",
  AuthMiddleware.checkAuth,
  QuizController.deleteQuiz
);

router.patch(
  "/edit-quiz/:quizId",
  QuizMiddleware.validateQuiz,
  AuthMiddleware.checkAuth,
  QuizController.editQuiz
);
router.patch(
  "/update-quiz-stats/:quizId",
  QuizMiddleware.validateQuiz,
  QuizController.updateQuizStats
);

export default router;
