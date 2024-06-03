import { Quiz } from "../models/index.js";
import CrudRepository from "./crud.repository.js";

class QuizRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }
  async getAllQuizzesByUser(userId) {
    const quizzes = await Quiz.find({ userId: userId });
    return quizzes;
  }
}

export default QuizRepository;
