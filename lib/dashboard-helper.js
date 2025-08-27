import { auth } from "@/auth";
import {
  getCourseDetails,
  getCourseDetailsByInstructor,
} from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import { getUserByEmail, getUserDetails } from "@/queries/users";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";
async function populateReviewData(reviews) {
  const populatedReviews = Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user);
      review["studentName"] = `${student?.firstName} ${student?.lastName}`;
      return review;
    })
  );
  return populatedReviews;
}
async function populateEnrollmentData(enrollments) {
  const populatedEnrollments = Promise.all(
    enrollments.map(async (enrollment) => {
      const student = await getUserDetails(enrollment?.student);
      enrollment["studentName"] = `${student?.firstName} ${student?.lastName}`;
      enrollment["studentEmail"] = student?.email;
      const filter = {
        course: enrollment?.course,
        student: enrollment?.student,
      };
      const report = await getAReport(filter);
      enrollment["progress"] = 0;
      enrollment["quizMark"] = 0;
      if (report) {
        const course = await getCourseDetails(enrollment?.course);
        const totalModules = course?.modules?.length;
        const totalCompletedModules =
          report?.totalCompletedModeules?.length || 0;
        const progress = totalCompletedModules * 100;
        enrollment["progress"] = progress;
        const quizzes = report?.quizAssessment?.assessments;
        const takenQuizzes = quizzes?.filter((quiz) => quiz?.attempted);
        const totalCorrect = takenQuizzes
          ?.map((quiz) => {
            const item = quiz?.options;
            return item?.filter(
              (option) => option?.isCorrect && option?.isSelected
            );
          })
          .filter((element) => element.length > 0)
          .flat();
        const marksFromQuizzes = totalCorrect ? totalCorrect.length * 5 : 0;
        enrollment["quizMark"] = marksFromQuizzes;
      }
      return enrollment;
    })
  );
  return populatedEnrollments;
}
export async function getInstructorDashboardData(dataType) {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session?.user?.email);
    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case ENROLLMENT_DATA:
        return populateEnrollmentData(data?.enrollments);
      case REVIEW_DATA:
        return populateReviewData(data?.reviews);
      default:
        return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
