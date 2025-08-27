import {
  ENROLLMENT_DATA,
  getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const EnrollmentsPage = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);
  const enrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollments} />
    </div>
  );
};

export default EnrollmentsPage;
