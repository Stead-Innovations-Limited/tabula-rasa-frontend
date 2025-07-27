"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FiCamera } from "react-icons/fi";
import handleFileUploads from "@/server-actions/handleFileUploads";
import setProfileImage from "@/server-actions/setProfileImage";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axios from "axios";
import type { AxiosProgressEvent } from "axios";

const errorToast = (error: string) =>
  toast.error(error, {
    classNames: {
      toast: "!text-red-500",
      title: "!text-red-500",
      description: "!text-red-500",
    },
  });

export default function ProfileImagePicker() {
  // State for uploading state
  const [uploading, setUploading] = useState(false);
  // State for upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  // Get the session data and the update function from the useSession hook
  const { data: session, update } = useSession();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Set uploading state to true
      setUploading(true);
      // If the session data does not exist or undefined, we just return;
      const file = acceptedFiles[0];
      if (!file || !session || !session.user) {
        setUploading(false);
        return;
      }

      // Get the presigned Url that i can upload the image to
      const res = await handleFileUploads(file.name, file.size, file.type);
      // If there's an error, we show a toast
      if (res.error) {
        errorToast(res.message);
        return false;
      }
      // If there is an error, or if the presigned URL or file name is not returned, we return early
      // This is to ensure that we do not try to upload the file if the presigned URL is not valid
      if (res.error || !res.presignedUrl || !res.fileName) {
        setUploading(false);
        return false;
      }
      const { presignedUrl, fileName } = res;

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total!);
          // Update the upload progress state
          setUploadProgress(percentage);
        },
      });

      // Send the filename to the server
      const profileImageResponse = await setProfileImage({ fileName });
      // If there's an error, we show a toast
      if (profileImageResponse.error) {
        setUploading(false);
        errorToast(profileImageResponse.message);
        return false;
      }
      // Update the profileImage on the session
      update({
        user: {
          ...session.user,
          profileImage: fileName,
        },
      });
      // Set uploading state to false
      setUploading(false);
      // Show a toast to indicate success
      toast.success(profileImageResponse.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
    },
    [session, update]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop,
  });

  return (
    <>
      <section
        className={cn(
          `w-full flex flex-col items-center gap-6`,
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} />
        <div
          // className={cn("p-1 rounded-full", uploading && `bg-conic-[${uploadProgress * 360}] from-olive to-white`)}
          className={cn(
            "p-1 rounded-full",
            uploading &&
              "bg-[conic-gradient(from_0deg,olive_calc(var(--progress)*1turn),white_0)]"
          )}
          style={
            uploading
              ? ({ "--progress": uploadProgress } as React.CSSProperties)
              : undefined
          }
        >
          <div
            {...getRootProps()}
            className={`bg-black opacity-95 size-30 md:size-36 rounded-full overflow-clip flex items-center justify-center relative`}
          >
            <Image
              src={
                session?.user.profileImage ||
                "https://res.cloudinary.com/drlrawk5w/image/upload/v1724100934/profilePic_gxon9j.webp"
              }
              alt='Profile Image'
              fill
              className='-z-2 scale-125 object-fit object-cover'
            />
            <FiCamera className='size-12 md:size-18 text-white' />
          </div>
        </div>
        <p className='font-roboto text-lg md:text-xl text-center text-olive'>
          A clear profile photo helps personalize your experience.
        </p>
      </section>
    </>
  );
}
