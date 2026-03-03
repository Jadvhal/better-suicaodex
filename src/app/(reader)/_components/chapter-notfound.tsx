import { Button } from "@/components/ui/button";
import Link from "next/link";
import CatBook from "#/images/cat-books.svg";
import Image from "next/image";

export default function ChapterNotFound() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <Image
        src={CatBook}
        alt="CatBooks"
        className="w-[400px] h-auto"
        priority
      />
      <div className="flex flex-col gap-4">
        <p className="uppercase font-black text-xl md:text-3xl drop-shadow-lg text-center">
          The chapter you're looking for doesn't exist!
        </p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
