import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import https, { status } from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
    }

    // verify token

    const decoded = jwt.verify(
      token,
      config.access_token as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

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
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
    }

    req.user = decoded as JwtPayload;
    // console.log(decoded);
    next();
  });
};

export default auth;
