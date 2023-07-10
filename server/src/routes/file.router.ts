import { Router } from "express";
import { upload } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.post(
  "/upload",
  upload.single("file"),
  async (req, res, next) => {
    try {
      return res.send("File uploaded successfully.");
    } catch (err) {
      next(err);
    }
  }
);

export default fileRouter;
