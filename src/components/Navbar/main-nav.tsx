"use client";

import Link from "next/link";
import useScrollOffset from "@/hooks/use-scroll-offset";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { logos } from "../logos";
import { Home } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function MainNav() {
  const { isAtTop } = useScrollOffset();
  const t = useTranslation();
  // const pathname = usePathname();

  return (
    <Link
      href="/"
      className="me-4 flex items-center gap-0.5 justify-start lg:me-6"
    >
      <Home
        className={cn(
          "size-6 transition-colors",
          !isAtTop ? "text-foreground" : "text-foreground md:text-primary-foreground/90"
        )}
      />
      <span className="font-bold text-xl ms-1 tracking-tight drop-shadow-md hidden leading-none sm:block">
        {t.nav.home}
      </span>
      <span className="font-bold text-xl ms-1 tracking-tight drop-shadow-md sm:hidden leading-none">
        {t.nav.home}
      </span>
    </Link>
  );
}
