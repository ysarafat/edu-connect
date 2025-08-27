import {
  getInstructorDashboardData,
  REVIEW_DATA,
} from "@/lib/dashboard-helper";
import { getCourseDetails } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ReviewsPage = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);
  const reviews = await getInstructorDashboardData(REVIEW_DATA);
  const filterReviews = reviews?.filter(
    (review) => review.courseId.toString() === courseId
  );
  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={filterReviews} />
    </div>
  );
};

export default ReviewsPage;
