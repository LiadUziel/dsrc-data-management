import express, { Router } from "express";
import {
  hashPasswordMiddleware,
  createUserDB,
} from "../controllers/auth.controller";

const authRouter: Router = express.Router();

// POST /api/auth/signup
authRouter.post("/signup", hashPasswordMiddleware, createUserDB);

export default authRouter;
