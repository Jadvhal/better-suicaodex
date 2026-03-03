import ErrorPage from "@/components/error-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
};

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="The page you're looking for doesn't exist, has been moved, or is no longer available. Try going back to the homepage or search for something else."
    />
  );
}
