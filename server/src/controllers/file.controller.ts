import multer from "multer";

const destination: string = "../files";
let currentDateString;
let fileName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination); // Specify the destination folder where the file will be saved
  },
  filename: function (req, file, cb) {
    const nowDate = new Date();
    currentDateString = `${new Date().toLocaleDateString()} ${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}`;
    fileName = `${currentDateString} ${file.originalname}`;
    cb(null, fileName); // Use the original file name as part of the saved file name
  },
});
export let upload = multer({ storage });


