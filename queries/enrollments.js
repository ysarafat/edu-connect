import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollments-model";

export async function getEnrollmentForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}

export async function createEnrollment(courseId, studentId, method) {
  const newEnrollment = {
    course: courseId,
    student: studentId,
    enrollment_date: new Date(),
    status: "not-started",
    method: method,
  };
  try {
    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
