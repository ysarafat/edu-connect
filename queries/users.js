import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  const user = await User.findOne({ email }).lean();
  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, oldPassword) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  return isMatch;
}
