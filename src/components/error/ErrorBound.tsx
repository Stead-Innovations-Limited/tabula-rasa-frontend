"use client";

import Error from "@/app/error";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";

export default function ErrorBound({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <ErrorBoundary
      FallbackComponent={Error}
      onReset={() => {
        // Reset any error state here
        router.refresh();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}