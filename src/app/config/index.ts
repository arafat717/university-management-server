import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5001,
  database_url: process.env.MONGODB_URL,
  student_pass: process.env.USER_PASSWORD,
  bcrypt_rount: process.env.BCRYPT_ROUNT,
  default_password: process.env.DEFAULT_PASS,
  access_token: process.env.ACCESS_SCERET,
  REFRESH_SCERET: process.env.REFRESH_SCERET,
  ACCESS_SCERET_EXPIREIN: process.env.ACCESS_SCERET_EXPIREIN,
  REFRESH_SCERET_EXPIREIN: process.env.REFRESH_SCERET_EXPIREIN,
  RESET_PASSWORD_UI_LINK: process.env.RESET_PASSWORD_UI_LINK,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
