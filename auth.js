import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";

async function refreshAccessToken(token) {
  try {
    const url = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens?.access_token,
      accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
      refreshToken: refreshedTokens?.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (user && account) {
  //       return {
  //         user,
  //         accessToken: account?.access_token,
  //         accessTokenExpires: Date.now() + (account?.expires_at ?? 0) * 1000,
  //         refreshToken: account?.refresh_token,
  //       };
  //     }
  //     if (Date.now() < token.accessTokenExpires) {
  //       return token;
  //     }
  //     return refreshAccessToken(token);
  //   },
  //   async session({ session, token }) {
  //     session.user = token?.user;
  //     session.accessToken = token?.accessToken;
  //     session.error = token?.error;
  //     return session;
  //   },
  // },
});
