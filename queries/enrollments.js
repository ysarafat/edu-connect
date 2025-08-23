import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollments-model";

export async function getEnrollmentForCourse(courseId) {
  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}
