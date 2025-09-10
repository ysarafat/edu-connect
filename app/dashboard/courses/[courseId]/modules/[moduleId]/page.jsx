import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { getModule } from "@/queries/modules";
import { ArrowLeft, BookOpenCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { CourseActions } from "../../_components/course-action";
import { LessonForm } from "./_components/lesson-form";
import { ModuleTitleForm } from "./_components/module-title-form";

const Module = async ({ params: { courseId, moduleId } }) => {
  const modules = await getModule(moduleId);
  const lessons = replaceMongoIdInArray(modules?.lessonIds).sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      <AlertBanner
        label="This module is unpublished. It will not be visible in the course."
        variant="warning"
      />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-end">
              <CourseActions />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your module</h2>
              </div>
              <ModuleTitleForm
                initialData={{ title: modules?.title }}
                courseId={courseId}
                chapterId={moduleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Module Lessons</h2>
              </div>
              <LessonForm initialData={lessons} moduleId={moduleId} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2> */}
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
