import express, { Router } from "express";
import {
  hashPasswordMiddleware,
  createUserDB,
  login,
} from "../controllers/auth.controller";

const authRouter: Router = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", hashPasswordMiddleware, createUserDB);

authRouter.post("/login", login);

export default authRouter;
