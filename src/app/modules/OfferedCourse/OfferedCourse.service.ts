import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemisterRegistration } from "../semisterRegistration/semisterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import status from "http-status";
import { hasTimeConflict } from "./OfferedCourse.utils";
import { Student } from "../student/student.model";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartmenet,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists = await SemisterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, `Semister Registration not found!`);
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcdemicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcdemicFacultyExists) {
    throw new AppError(status.NOT_FOUND, `Academic Faculty not found!`);
  }

  const isAcademicDepartmenetExists = await AcademicDepartment.findById(
    academicDepartmenet
  );
  if (!isAcademicDepartmenetExists) {
    throw new AppError(status.NOT_FOUND, `Academic Department not found!`);
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(status.NOT_FOUND, `Course not found!`);
  }

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, `Faculty not found!`);
  }

  const isdepartmentdelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartmenet,
  });
  if (!isdepartmentdelongToFaculty) {
    throw new AppError(
      status.BAD_REQUEST,
      `This ${isAcademicDepartmenetExists.name} is not belong to this ${isAcdemicFacultyExists.name}`
    );
  }

  const issameOfferedCourseExistsWithSameRegisteredSemesterWithSamesection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (issameOfferedCourseExistsWithSameRegisteredSemesterWithSamesection) {
    throw new AppError(
      status.BAD_REQUEST,
      `Offered Course with same section is already exist!`
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `This faculty is not avaiiable at that time ! Chose other tieme or day`
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const registrationQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await registrationQuery.countTotal();
  const result = await registrationQuery.modelQuery;
  return { meta, result };
};

const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered course not found !");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(status.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus = await SemisterRegistration.findById(
    semesterRegistration
  );

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(status.NOT_FOUND, "Offered Course not found");
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemisterRegistration.findById(
    semesterRegistation
  ).select("status");

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      status.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

const getMyOfferedCourseFromDb = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const student = await Student.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new AppError(status.NOT_FOUND, "User is noty found");
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemester = await SemisterRegistration.findOne(
    {
      status: "ONGOING",
    }
  );

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      status.NOT_FOUND,
      "There is no ongoing semester registration!"
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartmenet: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOngoingRegistrationSemester",
                    ],
                  },
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ["$course.preRequisiteCourses", []] },
            {
              $setIsSubset: [
                "$course.preRequisiteCourses.course",
                "$completedCourseIds",
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            "$course._id",
            {
              $map: {
                input: "$enrolledCourses",
                as: "enroll",
                in: "$$enroll.course",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;

  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

export const OfferedCourseService = {
  createOfferedCourseIntoDb,
  getAllOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseIntoDb,
  deleteOfferedCourseFromDB,
  getMyOfferedCourseFromDb,
};
