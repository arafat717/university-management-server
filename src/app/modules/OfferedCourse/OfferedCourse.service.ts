import QueryBuilder from "../../builder/QueryBuilder";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

const getAllOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const registrationQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await registrationQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {};

export const OfferedCourseService = {
  createOfferedCourseIntoDb,
  getAllOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseIntoDb,
};
