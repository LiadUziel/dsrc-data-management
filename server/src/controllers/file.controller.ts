import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { bucket } from "../config/storage-config";

const upload = multer({ storage: multer.memoryStorage() });

// Middleware configuration settings for upload
export const uploadFile = upload.single("file");

export const uploadFileToFirebase = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = `${uuidv4()}_${req.file.originalname}`;
    const blob = bucket.file(fileName);

    await blob.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    return res.status(200).send({ fileName });
  } catch (err) {
    return res.status(500).send("Something went wrong with the file upload.");
  }
};

export let upload = multer({ storage });


