import { StatusCodes } from "http-status-codes";
import { QuizService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const quizService = new QuizService();

const createQuiz = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const quiz = await quizService.createQuiz(data);
    SuccessResponse.message = "Sucessfully created the quiz.";
    SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.quizId);
    SuccessResponse.message = "Successfully fetched the quiz.";
    SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllQuizzesByUser = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzesByUser(req.user._id);
    SuccessResponse.message =
      "Successfully fetched all the quizzes created by the User.";
    SuccessResponse.data = quizzes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await quizService.deleteQuiz(req.params.quizId, req.user._id);
    SuccessResponse.message = "Successfully deleted the quiz.";
    SuccessResponse.data = quiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const editQuiz = async (req, res) => {
  try {
    const updatedQuiz = await quizService.editQuiz(
      req.params.quizId,
      req.body,
      req.user._id
    );

    SuccessResponse.message = "Successfully edited the quiz.";
    SuccessResponse.data = updatedQuiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const updateQuizStats = async (req, res) => {
  try {
    const updatedQuiz = await quizService.updateQuizStats(req.params.quizId, req.body);
    SuccessResponse.message = "Successfully submitted the quiz.";
    SuccessResponse.data = updatedQuiz;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export default {
  createQuiz,
  getQuizById,
  getAllQuizzesByUser,
  deleteQuiz,
  editQuiz,
  updateQuizStats,
};
