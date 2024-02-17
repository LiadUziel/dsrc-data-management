import { Router } from "express";
import { upload } from "../controllers/file.controller";
const path = require('path');

const fileRouter = Router();

fileRouter.post("/upload", uploadFile, uploadFileToFirebase);

export default fileRouter;
