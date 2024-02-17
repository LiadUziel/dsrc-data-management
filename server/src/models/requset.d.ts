import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        email: string;
        isLogged: boolean;
        roles: string[];
      };
      data?: object;
      file?: Express.Multer.File;
    }
  }
}
