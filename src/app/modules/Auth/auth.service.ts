import status from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDb = async (payload: TLoginUser) => {
  //   checking if the use is not exists
  // const isUserExists = await User.findOne({ id: payload.id });
  const userExists = await User.isUserExistsByCustomId(payload?.id);
  if (!userExists) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  //checking if the use is deleted
  const isDeleted = userExists.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, "This user is deleted!");
  }

  // checking if the use is blocked
  const isBlocked = userExists.status;
  if (isBlocked === "blocked") {
    throw new AppError(status.NOT_FOUND, "This user is blocked!");
  }

  //   //   checking if the password is correct
  if (
    !(await User.isPasswordMatched(payload?.password, userExists?.password))
  ) {
    throw new AppError(status.FORBIDDEN, "Password do not matched!");
  }

  // create accesstoken

  const accessPayload = {
    userId: userExists.id,
    role: userExists.role,
  };

  const accesstoken = jwt.sign(accessPayload, config.access_token as string, {
    expiresIn: "10d",
  });

  return {
    accesstoken,
    needsPasswordChange: userExists.needsPasswordChange,
  };
};

const changePasswordIntoDb = async (
  user: { userId: string; role: string },
  payload
) => {
  const result = await User.findOneAndUpdate({
    id: user.userId,
    role: user.role,
  });
};

//

export const AuthService = {
  loginUserIntoDb,
  changePasswordIntoDb,
};
