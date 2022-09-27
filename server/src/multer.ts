import crypto from "crypto";
import multer from "multer";
import path from "path";

console.log(path.resolve(__dirname, ".."));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.resolve(__dirname, "..", "uploads"));
  },
  filename: (_, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, "");

      const fileName = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, fileName);
    });
  },
});

export const uploadReceipt = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
});
