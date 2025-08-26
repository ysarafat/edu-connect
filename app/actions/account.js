"use server";

import { User } from "@/model/user-model";
import { validatePassword } from "@/queries/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateUserInfo(email, updatedData) {
  try {
    const filter = { email: email };
    await User.findOneAndUpdate(filter, updatedData, { new: true });
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeUserPassword(email, oldPassword, newPassword) {
  const isMatch = await validatePassword(email, oldPassword);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }
  const filter = { email: email };
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      filter,
      { password: hashedPassword },
      { new: true }
    );
    revalidatePath("/account");
  } catch (error) {
    throw new Error(error);
  }
}
