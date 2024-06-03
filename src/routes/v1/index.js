import express from "express";
import { HealthCheckController } from "../../controllers/index.js";
import quizRoutes from "./quiz.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/quizzes", quizRoutes);

router.get("/healthcheck", HealthCheckController.healthcheck);

export default router;
