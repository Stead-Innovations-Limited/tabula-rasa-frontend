"use client";

import Error from "@/app/error";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorBound({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary
      FallbackComponent={Error}
    >
      {children}
    </ErrorBoundary>
  );
}