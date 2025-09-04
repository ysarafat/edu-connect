import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
  const courses = await Course.find({ active: true })
    .select([
      "title",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(courseId) {
  const course = await Course.findById(courseId)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .lean();
  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
  const courses = await Course.find({
    instructor: instructorId,
    active: true,
  }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrolment = await getEnrollmentForCourse(course._id.toString());
      return enrolment;
    })
  );
  const groupByCourses = Object.groupBy(
    enrollments.flat(),
    ({ course }) => course
  );
  const totalRevenue = courses?.reduce((acc, course) => {
    const enrollCount = groupByCourses[course?._id]?.length || 0;
    return acc + enrollCount * course.price;
  }, 0);

  const totalEnrollments = enrollments.reduce((item, currentValue) => {
    return item + currentValue.length;
  }, 0);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();
  const avgRating =
    totalTestimonials.reduce(function (acc, obj) {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  if (expand) {
    const instructorAllCourse = await Course.find({
      instructor: instructorId,
    }).lean();
    return {
      courses: instructorAllCourse?.flat(),
      enrollments: enrollments?.flat(),
      reviews: totalTestimonials,
    };
  }

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
    revenue: totalRevenue,
  };
}

export async function create(courseData) {
  try {
    const course = await Course.create(courseData);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error(error);
  }
}
