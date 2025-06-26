import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

export default function MyDropzone({
  value,
  onChange,
}: {
  value: File[];
  onChange: (files: File[]) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onChange([...value, ...acceptedFiles]);
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-lightolive rounded-xl p-8 md:py-14 text-center cursor-pointer transition-colors text-olive flex flex-col items-center justify-center gap-4",
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} />
        <p className='t'>
          {isDragActive
            ? "Drop files here..."
            : (<Image src="/imageUpload.png" width={85} height={85} alt="Upload Icon"/>)}
        </p>
        <p className='text-sm'>
          Drag and drop files/images here, or click to select files.
        </p>
      </div>

      {/* Preview List */}
      {value && value.length > 0 && (
        <ul className='mt-4 list-disc pl-5 text-sm text-muted-foreground'>
          {value.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
