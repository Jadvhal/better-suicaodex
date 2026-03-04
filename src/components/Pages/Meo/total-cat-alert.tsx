"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CATAAS_BASE, getCatCount } from "@/lib/cat";
import { IdCardIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function TotalCatAlert() {
  const {
    data: totalCats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cat-count"],
    queryFn: () => getCatCount(),
  });

  return (
    <Alert>
      <IdCardIcon />
      <AlertTitle className="font-medium line-clamp-none">
        Watch cat pictures for fun - 
        {totalCats && !isLoading && !error && ` Currently ${totalCats} cats.`}
      </AlertTitle>
      <AlertDescription>
        <span>
          Data fetched from:{" "}
          <a
            href={CATAAS_BASE}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            cataas.com
          </a>
        </span>
      </AlertDescription>
    </Alert>
  );
}
