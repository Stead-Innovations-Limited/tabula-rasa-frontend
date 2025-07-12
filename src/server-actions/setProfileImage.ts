"use server";

import axios from "axios";
import { tryCatch } from "@/utils/tryCatch";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function setProfileImage({fileName}: { fileName: string }) {
  try {
     const session = await getServerSession(authOptions);

    if (
      !session ||
      !(session as Session & { sessionToken?: string }).sessionToken
    ) {
      throw new Error("Token is required to save profile image.");
    }

    if (
      !session ||
      !(session as Session & { id?: string }).user.id
    ) {
      throw new Error("UserId is required to save profile Image.");
    }

    const token = session.sessionToken;
    const userId = session.user.id;

    // Here you would typically handle the business profile logic, such as calling an API
    const response = await tryCatch(async () => {
      return await axios.patch(
        `https://tabula-rasa-backend.up.railway.app/users/profile/${userId}`,
        {
          image_link: fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    });
    if (response.isError) {
      throw new Error(
        typeof response.errors === "string"
          ? response.errors
          : response.errors.join(", ")
      );
    }

    return {
      success: true,
      message: "Profile Image updated successfully.",
    };
  } catch (error) {
    return {
      error: true,
      errorData: error,
      message: "Failed to update profile image.",
    };
  }

}