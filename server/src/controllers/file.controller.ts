import { RequestHandler } from "express";
import multer from "multer";

let storage;
export let upload = multer({ storage });

export const configMulter: RequestHandler = async (req, res, next) => {
  try {
    // Set up the Multer storage configuration
    storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the destination folder where the file will be saved
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name as the saved file name
      },
    });
    upload = multer({ storage });
    next();
  } catch (e) {
    next(e);
  }
};

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
};
