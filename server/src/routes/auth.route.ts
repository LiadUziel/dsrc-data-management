import express, { Router } from "express";
import {
  hashPasswordMiddleware,
  createUserDB,
  login,
  authorizeMiddleware,
  isAdminMiddleware,
  validateEmailMiddleware,
  verifyJwtMiddleware,
  updateUserDB,
  validateEmailNotExistMiddleware,
  sendEmailWithLinkMiddleware,
  getLoggedUser,
  getUsers,
} from "../controllers/auth.controller";

const authRouter: Router = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", hashPasswordMiddleware, createUserDB);

// POST /api/auth/login
authRouter.post("/login", login);

//* example of protected route
authRouter.get("/protected", authorizeMiddleware, (req, res) => {
  return res.send({ result: "GG" });
});

//* example of protected route with admin role
authRouter.get(
  "/protected-admin",
  authorizeMiddleware,
  isAdminMiddleware,
  (req, res) => {
    return res.send({ result: "GG-ADMIN" });
  }
);

authRouter.post(
  "/forgot-password",
  validateEmailMiddleware,
  sendEmailWithLinkMiddleware
);

authRouter.get("/verify-jwt", verifyJwtMiddleware, (req, res) => {
  return res.send({ result: "verified!" });
});

authRouter.post(
  "/renew-password",
  validateEmailMiddleware,
  hashPasswordMiddleware,
  updateUserDB
);

authRouter.post(
  "/sendVerifyRegisterEmail",
  validateEmailNotExistMiddleware,
  sendEmailWithLinkMiddleware
);

// get details of logged user - GET /api/auth/me
authRouter.get("/me", authorizeMiddleware, getLoggedUser);

// get all users except the logged in user
authRouter.get("/users", authorizeMiddleware, getUsers);

export default authRouter;
