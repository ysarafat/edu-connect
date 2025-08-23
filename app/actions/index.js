"use server";

import { signIn } from "@/auth";

export async function credentialsLogin(formData) {
  try {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
