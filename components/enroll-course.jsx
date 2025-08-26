"use client";
import { createCheckoutSession } from "@/app/actions/stripe";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

const EnrollCourse = ({ asLink, course }) => {
  const formAction = async (data) => {
    const { url } = await createCheckoutSession(data);
    if (url) {
      window.location.assign(url);
    }
  };
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={course?.id} />
        <input type="hidden" name="title" value={course?.title} />
        <input type="hidden" name="price" value={course?.price} />
        {asLink ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
