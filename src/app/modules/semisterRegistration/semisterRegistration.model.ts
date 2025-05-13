import { model, Schema } from "mongoose";
import { TSemisterRegistration } from "./semisterRegistration.interface";

const SemisterRegistrationSchema = new Schema<TSemisterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "AcademicSemester",
      required: true,
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "ENDED"],
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

export const SemisterRegistration = model<TSemisterRegistration>(
  "SemisterRegistration",
  SemisterRegistrationSchema
);
