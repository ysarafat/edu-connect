import { replaceMongoIdInArray } from "@/lib/convertData";
import { getCourseDetails } from "@/queries/courses";
import CourseDetails from "./_components/course-details";
import CourseDetailsIntro from "./_components/course-details-intro";
import CourseTestimonials from "./_components/course-testimonials";

const SingleCoursePage = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);

  return (
    <>
      <CourseDetailsIntro course={course} />
      <CourseDetails course={course} />
      {course?.testimonials && (
        <CourseTestimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      {/* <RelatedCourse /> */}
    </>
  );
};
export default SingleCoursePage;
