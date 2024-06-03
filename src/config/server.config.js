import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quizzie-db",
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SALT_ROUND: process.env.SALT_ROUND,
  JWT_SECRET: process.env.JWT_SECRET,
  connect,
};
