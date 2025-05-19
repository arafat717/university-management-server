/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import AppError from "../error/AppError";
import https from "http-status";
import fs from "fs";
import config from "../config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const sentImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      throw new AppError(https.BAD_REQUEST, "Something went wrong");
    });

  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file is deleted");
    }
  });

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
