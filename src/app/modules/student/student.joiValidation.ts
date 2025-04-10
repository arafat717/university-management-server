import Joi from "joi";

const GurdianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const userNameSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First Name Is Required",
  }),
  middleName: Joi.string().allow(""),
  lastName: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.string().required(),
  bloodGroup: Joi.string().valid("A", "B", "AB", "O"),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  gender: Joi.string().valid("male", "female").required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  gurdian: GurdianSchema.required(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
