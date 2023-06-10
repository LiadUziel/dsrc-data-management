import { Router } from "express";
import { configMulter, upload } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.post(
  "/upload",
  configMulter,
  upload.single("file"),
  async (req, res, next) => {
    try {
      // File upload was successful
      return res.send("File uploaded successfully.");
    } catch (err) {
      next(err);
    }
  }
);

export default fileRouter;
