import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("No session ID found");
  }
  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }
  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  const studentName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const studentEmail = loggedInUser?.email;
  const courseTitle = course?.title;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  const paymentIntent = checkoutSession.payment_intent;
  const paymentStatus = paymentIntent ? paymentIntent.status : null;
  if (paymentStatus !== "succeeded") {
  }
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            {" "}
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations{" "}
              <strong className="font-semibold ">{studentName}</strong>! Your
              Enrollment was Successful for{" "}
              <strong className="font-semibold">{courseTitle}</strong>.
            </h1>
            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/think-in-a-redux-way/introduction">
                  Play Course
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Success;
