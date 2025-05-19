/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export type NewUser = {
  password: string;
  role: string;
  id: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJwtIssuedDeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
