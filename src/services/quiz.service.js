import { StatusCodes } from "http-status-codes";
import { QuizRepository, UserRepository } from "../repositories/index.js";
import AppError from "../utils/error/app.error.js";

class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.userRepository = new UserRepository();
  }

  async createQuiz(data) {
    try {
      const quiz = await this.quizRepository.create(data);
      const user = await this.userRepository.get(data.userId);
      user.quizCount = user.quizCount + 1;
      user.questionCount = user.questionCount + data.questions.length;
      await user.save();
      return quiz;
    } catch (error) {
      throw new AppError(
        "something went wrong while creating quiz.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getQuizById(id) {
    try {
      const quiz = await this.quizRepository.get(id);
      quiz.impressionCount += 1;
      await quiz.save();
      return quiz;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while fetching quiz by id.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllQuizzesByUser(userId) {
    try {
      const quizzes = await this.quizRepository.getAllQuizzesByUser(userId);
      let totalImpressionsCount = 0;
      quizzes.forEach((quiz) => {
        totalImpressionsCount += quiz.impressionCount;
      });
      const user = await this.userRepository.get(userId);
      user.impressionCount = totalImpressionsCount;
      await user.save();
      return quizzes;
    } catch (error) {
      throw new AppError(
        "Something went wrong while fetching all stories",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async editQuiz(id, data, userId) {
    try {
      const oldQuiz = await this.quizRepository.get(id);
      if (!oldQuiz) {
        throw new AppError("Quiz does not exist.", StatusCodes.BAD_REQUEST);
      }
      if (String(userId) !== String(oldQuiz.userId)) {
        throw new AppError(
          "User does have access to the quiz.",
          StatusCodes.UNAUTHORIZED
        );
      }
      const newQuiz = await this.quizRepository.update(id, data);

      return newQuiz;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while updating the quiz",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteQuiz(id, userId) {
    try {
      const quiz = await this.quizRepository.get(id);

      if (String(userId) !== String(quiz.userId)) {
        throw new AppError(
          "User does have access to the quiz.",
          StatusCodes.UNAUTHORIZED
        );
      }
      const deletedQuiz = await this.quizRepository.destroy(id);

      const user = await this.userRepository.get(userId);
      user.quizCount = user.quizCount - 1;
      user.questionCount = user.questionCount - deletedQuiz.questions.length;
      user.impressionCount = user.impressionCount - deletedQuiz.impressionCount;
      await user.save();
      return deletedQuiz;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while deleting the quiz.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateQuizStats(id, data) {
    try {
      const oldQuiz = await this.quizRepository.get(id);
      if (!oldQuiz) {
        throw new AppError("Quiz does not exist.", StatusCodes.BAD_REQUEST);
      }
      const newQuiz = await this.quizRepository.update(id, data);
      return newQuiz;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while updating the quiz",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default QuizService;
