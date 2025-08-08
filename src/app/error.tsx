"use client";

import "./globals.css";
import ErrorBar from "@/components/error/ErrorBar";
import ErrorContainer from "@/components/error/ErrorContainer";
import NavBarNoSearch from "@/components/navs/NavBarNoSearch";
import Footer from "@/components/reusable-ui/Footer";

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  resetErrorBoundary,
}: {
  error: Error & { digest?: string };
  resetErrorBoundary: () => void;
}) {
  return (
    <>
      <NavBarNoSearch />
      <ErrorBar />
      <ErrorContainer resetFn={resetErrorBoundary} />
      <Footer />
    </>
  );
}
