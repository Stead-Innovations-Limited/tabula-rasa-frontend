"use server"


// const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;
const CLOUDFLARE_ACCESSID = process.env.CLOUDFLARE_ACCESSID;
const CLOUDFLARE_ACCESSKEY = process.env.CLOUDFLARE_ACCESSKEY;
const CLOUDFLARE_ENDPOINT = process.env.CLOUDFLARE_ENDPOINT;
const CLOUDFLARE_BUCKETNAME = process.env.CLOUDFLARE_BUCKETNAME;
const CLOUDFLARE_PUBLIC_DOMAIN = process.env.CLOUDFLARE_PUBLIC_DOMAIN

const MAX_FILE_SIZE = 2 * 1024 ** 2 // 2 MB

// import { tryCatch } from "@/utils/tryCatch";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";


const r2 = new S3Client({
  region: "auto",
  endpoint: CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESSID!,
    secretAccessKey: CLOUDFLARE_ACCESSKEY!,
  },
});

const R2 = async (Key: string) => {
    const command = new PutObjectCommand({
      Bucket: CLOUDFLARE_BUCKETNAME,
      Key,
    });

    const url = await getSignedUrl(r2, command, { expiresIn: 60 * 60 }); // 1 hour
    return url;
  }


export default async function handleFileUploads(fileName: string, fileSize: number, fileType: string) {
  try {
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex === -1) {
      throw new Error("File name must have an extension.");
    }
    if (fileName.length < dotIndex + 2) {
      throw new Error("File name must have a valid extension.");
    }
    const fileExtension = fileName.slice(dotIndex + 1).toLowerCase();

    if(fileSize > MAX_FILE_SIZE) {
      throw new Error("File size exceeds the maximum limit of 2 MB.");
    }

    if(!fileType.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }

    const key = `${uuidv4()}.${fileExtension}`;

    const presignedUrl = await R2(key);

    // We have to add custom domain name to the key to be able to store it in backend
    const imageLink = CLOUDFLARE_PUBLIC_DOMAIN + "/" + key;
    return {
      success: true,
      presignedUrl,
      fileName: imageLink
    };
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "An unknown error occurred.",
    }
  }
}

