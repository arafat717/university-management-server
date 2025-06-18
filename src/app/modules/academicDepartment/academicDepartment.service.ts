import QueryBuilder from "../../builder/QueryBuilder";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartmentFromDb = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find(),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();
  return {
    meta,
    result,
  };
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
