import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        email: string;
        isLogged: boolean;
        role: string;
      };
      data?: object;
    }
  }
}
