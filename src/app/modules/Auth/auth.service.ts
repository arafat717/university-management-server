import status from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUserIntoDb = async (payload: TLoginUser) => {
  //   checking if the use is not exists
  const isUserExists = await User.findOne({ id: payload.id });
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  //checking if the use is deleted
  const isDeleted = isUserExists.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, "This user is deleted!");
  }

  // checking if the use is blocked
  const isBlocked = isUserExists.status;
  if (isBlocked === "blocked") {
    throw new AppError(status.NOT_FOUND, "This user is blocked!");
  }

  //   //   checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );

  console.log(isPasswordMatched);
};

export const AuthService = {
  loginUserIntoDb,
};
