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

export const downloadFileFromFirebase = async (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  const file = bucket.file(fileName);

  try {
    // Check if the file exists by attempting to get its metadata
    await file.getMetadata();

    // Create a read stream from the file
    const readStream = file.createReadStream();

    // Set the appropriate content type and filename
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Pipe the read stream to the response
    readStream.pipe(res);

    return res.send({ fileName });
  } catch (err: any) {
    console.error(err);
    // If the file does not exist or any other error occurs, send a 404 or 500 error.
    if (err.code === 404) {
      res.status(404).send("File not found.");
    } else {
      res.status(500).send("Error downloading the file.");
    }
  }
};
