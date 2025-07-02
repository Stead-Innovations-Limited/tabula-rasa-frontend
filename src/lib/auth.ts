import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { tryCatch } from "@/utils/tryCatch";
import axios from "axios";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    password: { String: string; Valid: boolean };
    firstname: { String: string; Valid: boolean };
    lastname: { String: string; Valid: boolean };
    created_at: { Time: string; Valid: boolean };
  };
  profile: {
    id: string;
    bio: { String: string; Valid: boolean };
    phone_no: { String: string; Valid: boolean };
    country: { String: string; Valid: boolean };
    address: { String: string; Valid: boolean };
    experience: { Int32: number; Valid: boolean };
    field: { String: string; Valid: boolean };
    business_name: { String: string; Valid: boolean };
    roles: string;
    created_at: { Time: string; Valid: boolean };
  };
  access_token: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
  token: string;
}

declare module "next-auth" {
  interface Session {
    sessionToken?: string;
    user: User;
  }
}


export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await tryCatch(
          async () =>
            await axios.post(
              "https://tabula-rasa-backend.up.railway.app/login",
              credentials
            )
        );
        if (response.isError) {
          throw new Error("Invalid email or password");
        }
        const data = response.data as LoginResponse;
        const user: User = {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstname.String,
          lastName: data.user.lastname.String,
          roles: data.profile.roles,
          token: data.access_token,
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = (user as User).token;
        token.user = user;
      }
      if (trigger === "update" && session?.user) {
        token.user = {
          ...user,
          ...session.user
        }

      }
      return token;
    },
    session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      session.user = token.user as User;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};