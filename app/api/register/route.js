import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  try {
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return new NextResponse.json("User already exists", { status: 409 });
    }
    await User.create(newUser);
    return new NextResponse("User has been created successfully", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
