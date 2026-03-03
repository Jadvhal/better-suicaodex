"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import ErrorPage from "@/components/error-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error 😭",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      error={error}
      reset={reset}
      statusCode={500}
      title="Oops! An Error Occurred"
      message="Something went wrong while loading this page. Please copy the error below and report it!"
    />
  );
}
