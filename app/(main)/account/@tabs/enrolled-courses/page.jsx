import { auth } from "@/auth";
import { getEnrollmentForStudent } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/enrolled-course-card";

async function EnrolledCourses() {
  const session = await auth();
  if (!session.user) {
    redirect("/login");
  }
  const loggedInUser = await getUserByEmail(session?.user?.email);
  const enrolledCourse = await getEnrollmentForStudent(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrolledCourse && enrolledCourse.length > 0 ? (
        enrolledCourse.map((enrollment) => (
          <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <p>No enrolled courses found.</p>
      )}
    </div>
  );
}

export default EnrolledCourses;
