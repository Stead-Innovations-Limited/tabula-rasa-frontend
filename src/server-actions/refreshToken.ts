"use server";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default async function refreshToken(refresh_token: string) {
  try {
    if (!refresh_token) {
      return {
        error: "NoRefreshTokenProvided",
      };
    }

    const response = await axios.post("https://tabula-rasa-backend.up.railway.app/refresh_token/", {
      refresh_token,
    });
    const data = response.data as {
      access_token: string;
    };

    const decoded = jwtDecode<{ expired_at: string }>(data.access_token);

    return {
      accessToken: data.access_token,
      tokenExpiration: new Date(decoded.expired_at).getTime(),
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return {
      error: "RefreshAccessTokenError",
    };
  }
}
