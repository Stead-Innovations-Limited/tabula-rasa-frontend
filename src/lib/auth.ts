import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { tryCatch } from "@/utils/tryCatch";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import refreshToken from "@/server-actions/refreshToken";

interface LoginResponse {
  user: {
    id: string;
    email: string;
    is_verified: boolean;
    firstname: string;
    lastname: string;
  };
  profile: {
    id: string;
    bio: { String: string; Valid: boolean };
    phone_no: { String: string; Valid: boolean };
    image_link: { String: string; Valid: boolean };
    country: { String: string; Valid: boolean };
    address: { String: string; Valid: boolean };
    experience: { Int32: number; Valid: boolean };
    field: { String: string; Valid: boolean };
    business_name: { String: string; Valid: boolean };
    roles: string;
    created_at: { Time: string; Valid: boolean };
  };
  access_token: string;
  refresh_token: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string
  roles: string;
  token: string;
  refreshToken: string;
  tokenExpiration: number;
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

        const decoded = jwtDecode<{ expired_at: string }>(data.access_token);

        // If the user is not verified, we resend a mail to the user, and then we throw an error which the client will use to redirect the user, we need token and mail.
        if(!data.user.is_verified) {
          const errorBody = {
            error: "EMAIL_NOT_VERIFIED",
            email: data.user.email,
            token: data.access_token
          }
          throw new Error(JSON.stringify(errorBody));
        }

        const user: User = {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstname,
          lastName: data.user.lastname,
          profileImage: data.profile.image_link.String || "https://res.cloudinary.com/drlrawk5w/image/upload/v1724100934/profilePic_gxon9j.webp",
          roles: data.profile.roles,
          // roles: "Business Account",
          token: data.access_token,
          refreshToken: data.refresh_token,
          tokenExpiration: new Date(decoded.expired_at).getTime(),
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        const u = user as User;
        token.accessToken = u.token;
        token.refreshToken = u.refreshToken;
        token.tokenExpiration = u.tokenExpiration;
        token.user = {
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          profileImage: u.profileImage,
          roles: u.roles,
        };
      }

      if (trigger === "update" && session?.user) {
        const userDetails = token.user;
        token.user = {
          ...(userDetails as User),
          ...session.user,
        };
      }

      // We check if token has not expired, if it hasn't expired, return it
      if (Date.now() < (token.tokenExpiration as number)) {
        return token;
      }

      // Token expired — refresh it
      const tokenResponse: {
        accessToken?: string;
        tokenExpiration?: number;
        error?: string;
      } = await refreshToken(token.refreshToken as string);

      // Set token value and expiration
      token.accessToken = tokenResponse.accessToken;
      token.tokenExpiration = tokenResponse.tokenExpiration;

      // Return token
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
