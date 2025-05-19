import status from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./utils";
import jwt from "jsonwebtoken";
import https from "http-status";

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

  const accesstoken = createToken(
    accessPayload,
    config.access_token as string,
    config.ACCESS_SCERET_EXPIREIN as string
  );
  const refreshToken = createToken(
    accessPayload,
    config.REFRESH_SCERET as string,
    config.REFRESH_SCERET_EXPIREIN as string
  );

  return {
    accesstoken,
    refreshToken,
    needsPasswordChange: userExists.needsPasswordChange,
  };
};

const changePasswordIntoDb = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userExists = await User.isUserExistsByCustomId(userData?.userId);
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
    !(await User.isPasswordMatched(payload?.oldPassword, userExists?.password))
  ) {
    throw new AppError(status.FORBIDDEN, "Password do not matched!");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_rount)
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  return null;
};

//

const refreshToken = async (token: string) => {
  // verify token

  const decoded = jwt.verify(
    token,
    config.REFRESH_SCERET as string
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const userExists = await User.isUserExistsByCustomId(userId);
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

  if (
    userExists.passwordChangeAt &&
    User.isJwtIssuedDeforePasswordChanged(
      userExists.passwordChangeAt,
      iat as number
    )
  ) {
    throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
  }

  // create accesstoken

  const accessPayload = {
    userId: userExists.id,
    role: userExists.role,
  };

  const accesstoken = createToken(
    accessPayload,
    config.access_token as string,
    config.ACCESS_SCERET_EXPIREIN as string
  );

  return {
    accesstoken,
  };
};

export const AuthService = {
  loginUserIntoDb,
  changePasswordIntoDb,
  refreshToken,
};
