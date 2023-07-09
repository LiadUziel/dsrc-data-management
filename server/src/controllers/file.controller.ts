import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../files/"); // Specify the destination folder where the file will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ' ' +  file.originalname); // Use the original file name as the saved file name
  },
});
export let upload = multer({ storage: storage });

