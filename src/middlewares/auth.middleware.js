import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import { UserValidations } from "../validators/index.js";

const userService = new UserService();

const validateUserSignUpRequest = (req, res, next) => {
  const validationResult = UserValidations.userSignUpValidationSchema.safeParse(
    req.body
  );
  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while Authenticating user.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const validateUserSignInRequest = (req, res, next) => {
  const validationResult = UserValidations.userSignInValidationSchema.safeParse(
    req.body
  );

  if (!validationResult.success) {
    ErrorResponse.message = "Something went wrong while Authenticating user.";
    ErrorResponse.error = new AppError(
      validationResult.error.formErrors.fieldErrors,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const checkAuth = async (req, res, next) => {
  try {
    const user = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

export default {
  validateUserSignInRequest,
  validateUserSignUpRequest,
  checkAuth,
};
