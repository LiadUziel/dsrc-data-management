import express, { Router } from "express";
import {
  hashPasswordMiddleware,
  createUserDB,
  login,
  authorizeMiddleware,
  isAdminMiddleware,
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

export default authRouter;
