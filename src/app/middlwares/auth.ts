import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import https from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);

    if (!token) {
      throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
    }

    // verify token
    jwt.verify(token, config.access_token as string, function (err, decoded) {
      if (err) {
        throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
      }
      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(https.UNAUTHORIZED, "Your are not authorized!");
      }

      req.user = decoded as JwtPayload;
      // console.log(decoded);
      next();
    });
  });
};

export default auth;
