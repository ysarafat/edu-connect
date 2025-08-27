import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/queries/categories";
import { getAReport } from "@/queries/reports";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const EnrolledCourseCard = async ({ enrollment }) => {
  const category = await getCategoryById(enrollment?.course?.category);
  const filter = {
    student: enrollment?.student,
    course: enrollment?.course?._id,
  };

  const report = await getAReport(filter);
  const totalCompletedModules = report?.totalCompletedModeules?.length || 0;
  const quizzes = report?.quizAssessment?.assessments;
  const totalQuizzes = quizzes ? quizzes.length : 0;
  const takenQuizzes = quizzes?.filter((quiz) => quiz?.attempted);
  const totalCorrect = takenQuizzes
    ?.map((quiz) => {
      const item = quiz?.options;
      return item?.filter((option) => option?.isCorrect && option?.isSelected);
    })
    .filter((element) => element.length > 0)
    .flat();
  const marksFromQuizzes = totalCorrect ? totalCorrect.length * 5 : 0;
  const otherMarks = report?.quizAssessment?.otherMarks || 0;
  const totalMarks = marksFromQuizzes + otherMarks;
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
          alt={"course"}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {enrollment?.course?.title}
        </div>
        <p className="text-xs text-muted-foreground">{category?.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>{enrollment?.course?.modules.length} Chapters</span>
          </div>
        </div>
        <div className=" border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {enrollment?.course?.modules?.length}
            </p>
            <p className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules{" "}
              <Badge variant="success">{totalCompletedModules}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: {totalQuizzes}
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken{" "}
              <Badge variant="success">{takenQuizzes?.length || 0}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {marksFromQuizzes}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-md md:text-sm font-medium text-slate-700">
              Others
            </p>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {otherMarks}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </p>

          <p className="text-md md:text-sm font-medium text-slate-700">
            {totalMarks}
          </p>
        </div>
        {/* 
          <CourseProgress
            size="sm"
            value={80}
            variant={110 === 100 ? "success" : ""}
          /> */}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
