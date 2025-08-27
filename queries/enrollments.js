import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
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

export async function getEnrollmentForStudent(studentId) {
  try {
    const enrollments = await Enrollment.find({ student: studentId })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();
    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    throw new Error(error);
  }
}

export async function hasEnrollmentForCourse(courseId, studentId) {
  try {
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();
    if (!enrollment) return false;
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
