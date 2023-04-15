import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        email: string;
        isLogged: boolean;
        isAdmin: boolean;
      };
      data?: object;
    }
  }
}
