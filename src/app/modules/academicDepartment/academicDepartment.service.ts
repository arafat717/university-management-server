import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartment.findOne({ id }).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      upsert: true,
    }
  );
  return result;
};

export const AccademicDepartmentService = {
  createAcademicDepartmentIntoDb,
  getAllDepartmentFromDb,
  getSingleDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
