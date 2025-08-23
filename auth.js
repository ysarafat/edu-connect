import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./model/user-model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
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
