import { Router } from "express";
import {
  downloadFileFromFirebase,
  // upload,
  uploadFile,
  uploadFileToFirebase,
} from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.post("/upload", uploadFile, uploadFileToFirebase);

fileRouter.get("/download/:fileName", downloadFileFromFirebase);

export default fileRouter;
