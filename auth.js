import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        const { email, password } = credentials;
        try {
          const user = await User.findOne({ email });

          if (user) {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password
            );
            if (isPasswordValid) {
              return user;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("No user found with the given email");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
