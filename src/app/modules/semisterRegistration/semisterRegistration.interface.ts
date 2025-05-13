/* eslint-disable no-unused-vars */

import { Types } from "mongoose";

export type TSemisterRegistration = {
  academicSemester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
