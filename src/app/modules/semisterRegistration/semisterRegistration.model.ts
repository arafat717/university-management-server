import { model, Schema } from "mongoose";
import { TSemisterRegistration } from "./semisterRegistration.interface";

const SemisterRegistrationSchema = new Schema<TSemisterRegistration>({});

export const SemisterRegistration = model<TSemisterRegistration>(
  "AcademicSemester",
  SemisterRegistrationSchema
);
