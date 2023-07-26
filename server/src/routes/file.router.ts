import { Router } from "express";
import { upload } from "../controllers/file.controller";
const path = require('path');

const fileRouter = Router();

fileRouter.post(
  "/upload",
  upload.single("file"),
  async (req: any, res, next) => {
    try {
      const uploadedFile = req.file;
      const response = {
        message: 'File uploaded successfully.',
        filepath: `${uploadedFile.path}`,
      };
  
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

fileRouter.post('/download', async(req, res, next) => {
  try {
    
    const fileAbsolutePath = path.join(path.dirname(path.dirname(__dirname)), req.body.filePath);
    res.sendFile(fileAbsolutePath);
  }
  catch (err) {
    next(err);
  }
});

export default fileRouter;
