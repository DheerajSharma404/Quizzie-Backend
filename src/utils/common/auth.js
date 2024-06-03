import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ServerConfig } from "../../config/index.js";

const checkPassword = (plainPasswrod, encryptedPassword) => {
  try {
    return bcrypt.compareSync(plainPasswrod, encryptedPassword);
  } catch (error) {
    throw error;
  }
};

const createToken = (input) => {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

export default {
  checkPassword,
  createToken,
  verifyToken,
};
