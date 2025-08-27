import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("You are not authenticated!", {
      status: 401,
    });
  }
  await dbConnect();
  try {
    const user = await getUserByEmail(session?.user?.email);
    const { password, ...rest } = user;
    return new NextResponse(JSON.stringify(rest), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error?.message, {
      status: 500,
    });
  }
}
