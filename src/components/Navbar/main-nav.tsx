"use client";

import Link from "next/link";
import useScrollOffset from "@/hooks/use-scroll-offset";
import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";
import Image from "next/image";
import { logos } from "../logos";

export function MainNav() {
  const { isAtTop } = useScrollOffset();
  // const pathname = usePathname();

  return (
    <Link
      href="/"
      className="mr-4 flex items-center gap-0.5 justify-start lg:mr-6"
    >
      <Image
        src={logos.gehenna}
        alt="MangaHat's logo"
        className={cn(
          "max-h-8 w-auto grayscale contrast-150 dark:invert",
          // pathname.includes("/manga") && "invert",
          !isAtTop && "invert-0 md:invert-0"
        )}
        quality={100}
        priority
      />
      <span className="font-bold text-xl ml-1 tracking-tight drop-shadow-md hidden leading-none sm:block">
        MangaHat
      </span>
      <span className="font-bold text-xl ml-1 tracking-tight drop-shadow-md sm:hidden leading-none">
        MH
      </span>
    </Link>
  );
}
