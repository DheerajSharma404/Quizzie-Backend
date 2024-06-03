import express from "express";
import { AuthController } from "../../controllers/index.js";
import { AuthMiddleware } from "../../middlewares/index.js";

const router = express.Router();

/** Register user.
 * METHOD: POST
 * REQUEST BODY: { name:"John doe",email:"john123@gmail.com",password:"johnDoe@123",confirmPassword:"johnDoe@123"};
 * ENDPOINT: /user/sign-up
 *  RESPONSE: {
    "error": false,
    "data": {
        "name": "John Doe",
        "email":"john123@gmail.com"
        "password": "$2b$10$PNFHh1rJmRxsgPS9Ov/n29T3cjYqMxy5/cmeru8Xt9meZyve",
        "quizCount":0,
        "quizCount":0,
        "quizCount":0,
        "_id": "663b3d3eb7f69b26c457425b",
        "createdAt": "2024-05-08T08:52:14.838Z",
        "updatedAt": "2024-05-08T08:52:14.838Z",
        "__v": 0
    },
    "message": "User successfully signed up.",
    "success": true
}
 */
router.post(
  "/sign-up",
  AuthMiddleware.validateUserSignUpRequest,
  AuthController.signUp
);

/** Login user.
 * METHOD: POST
 * REQUEST BODY: {email:"john123@gmail.com",password:"johnDoe@123"};
 * ENDPOINT: /user/sign-in
 * RESPONSE:{
    "error": false,
    "data": {
    name:"John Doe"
    email:"john123@gmail.com"
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2IzZDNlYjdmNjliU3NDI1YiIsInVzZXJuYW1lIjoiY2FyZGkgYiIsImlhdCI6MTcxNTE1ODM3NCwiZXhwIjoxNzE1MjQ0Nzc0fQ.2Gu8gswb9bz46HOpgiIDoqJhclRg9if7YujpevRKOyY"
  },
    "message": "User successfully signed in.",
    "success": true
}
 */
router.post(
  "/sign-in",
  AuthMiddleware.validateUserSignInRequest,
  AuthController.signIn
);

/** Logout user.
 * METHOD:POST
 * REQUEST HEADERS: token
 * ENDPOINT: /user/sign-out
 * RESPONSE:{
    "error": false,
    "data": {
        "_id": "663b3d3eb7f69b26c457425b",
        "name": "John Doe",
        email:"john123@gmail.com"
        "password": "$2b$10$PNFHh1rJmRxsgPSywQWS9Ov/n29T3cjYqMxy5/cmeru8Xt9meZyve",
        "createdAt": "2024-05-08T08:52:14.838Z",
        "updatedAt": "2024-05-08T08:52:14.838Z",
        "__v": 0
    },
    "message": "User successfully sign out",
    "success": true
}
 */
router.post("/sign-out", AuthMiddleware.checkAuth, AuthController.signOut);

router.post(
  "/validate-token",
  AuthMiddleware.checkAuth,
  AuthController.validateUser
);

export default router;
