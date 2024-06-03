import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { QuizValidation } from "../validators/index.js";

const validateQuiz = (req, res, next) => {
  const validation = QuizValidation.quizValidationSchema.safeParse(req.body);
  if (!validation.success) {
    ErrorResponse.message = "Quiz validation failed";
    ErrorResponse.error = new AppError(
      validation.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

export default {
  validateQuiz,
};
