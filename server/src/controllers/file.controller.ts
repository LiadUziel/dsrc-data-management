import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../files/"); // Specify the destination folder where the file will be saved
  },
  filename: function (req, file, cb) {
    // const currentDateString = new Date().toISOString().replace(/:/g, '-');
    const currentDateString = Date.now();
    const fileName = `${currentDateString} ${file.originalname}`;
    cb(null, fileName); // Use the original file name as the saved file name
  },
});
export let upload = multer({ storage: storage });

