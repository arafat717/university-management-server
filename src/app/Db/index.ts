import config from "../config";
import { User } from "../modules/user/user.model";

const superAdmin = {
  id: "0001",
  email: "arafatjibon33@gmail.com",
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: "superAdmin",
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({ role: "superAdmin" });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
