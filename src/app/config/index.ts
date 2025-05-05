import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5002,
  database_url: process.env.MONGODB_URL,
  student_pass: process.env.USER_PASSWORD,
  bcrypt_rount: process.env.BCRYPT_ROUNT,
  default_password: process.env.DEFAULT_PASS,
};
