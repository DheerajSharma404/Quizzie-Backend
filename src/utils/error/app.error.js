class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // calling the construtor of Error (parent) class.
    this.statusCode = statusCode;
    this.explanation = message;
  }
}

export default AppError;
