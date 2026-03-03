"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, RefreshCw, Bug, Check, Clipboard } from "lucide-react";
import {
  SiDiscord,
  SiFacebook,
  SiGithub,
} from "@icons-pack/react-simple-icons";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";
import "@/styles/error-page.css";

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
  message?: string;
  title?: string;
  statusCode?: number;
}

export default function ErrorPage({
  error,
  reset,
  message = "Something went wrong. The page you're looking for doesn't exist or can't be accessed.",
  title = "Oops! An Error Occurred",
  statusCode = 404,
}: ErrorPageProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [hasCopied, setHasCopied] = useState(false);
  const quotes = [
    "This page vanished like the anime season 2 you've been waiting for...",
    "404 - Page not found, like finding a completed manga",
    "This page disappeared faster than a new HxH chapter",
    "Looks like this page got isekai'd to another world",
    "Don't worry, One Piece hasn't ended yet, but this page has",
    "This page vanished like Saitama's hair",
    "You searched for this page but only got MUDA MUDA MUDA MUDA!",
    "This page flew away like your salary when buying anime figures",
    "Sorry, nobody can find this page, not even Conan",
    "This page is on hiatus, will be back after a long break like Berserk",
    "404 - This page got snapped away by Thanos",
    "This page was erased from the Death Note",
    "This page disappeared like a weeb's social skills after binge-watching 50 episodes",
    "I'll become the Pirate King... oh wait, that's the page you're looking for!",
    "Nani?! This page doesn't exist?!",
    "Even with Sharingan you can't find this page",
    "Omae wa mou shindeiru... and so is the page you're looking for",
    "Don't worry, this is just a filler arc, the page you need will appear next season",
  ];
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    if (reset) {
      reset();
    } else {
      router.refresh();
    }
    setTimeout(() => setIsRetrying(false), 1000);
  };

  const handleCopyError = () => {
    if (error) {
      navigator.clipboard.writeText(error.message);
      setHasCopied(true);
      toast.success("Error details copied to clipboard");
      setTimeout(() => setHasCopied(false), 2000);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center p-4 opacity-0 animate-fadeIn">
      <Card className="max-w-2xl w-full shadow-lg overflow-hidden border-2 border-primary/10">
        <CardHeader className="bg-linear-to-r from-primary/10 to-secondary/10 pb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 mask-[linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)] -z-10"></div>
          <div className="mx-auto mb-4 text-6xl font-bold text-primary">
            {statusCode}
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative h-60 w-60 shrink-0 mx-auto md:mx-0 animate-gentle-pulse">
              <Image
                src="/images/doro_think.webp"
                alt="Error Illustration"
                fill
                className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300 rounded-md"
                priority
                unoptimized
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p className="text-muted-foreground">{message}</p>
              <p className="text-sm italic text-muted-foreground">
                {randomQuote}
              </p>
              {error && (
                <div className="mt-4 p-3 bg-destructive/10 rounded-md text-sm text-destructive border border-destructive/20 shadow-xs hover:bg-destructive/15 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">Error Details:</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={handleCopyError}
                    >
                      {hasCopied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Clipboard className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="font-mono break-all">{error.message}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-center pt-2 pb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/")}
            className="gap-1 hover:bg-primary/10 hover:-translate-x-1 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="gap-1 hover:shadow-md transition-all hover:bg-primary/90 group"
            disabled={isRetrying}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRetrying ? "animate-spin" : "group-hover:animate-spin"
                }`}
            />
            Retry
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 hover:bg-secondary/70 transition-colors"
              >
                <Bug className="h-4 w-4" />
                Report Bug
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-fadeScale">
              <DropdownMenuItem asChild>
                <Link
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <SiFacebook className="h-4 w-4 text-blue-600" />
                  <span>Facebook</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  <SiDiscord className="h-4 w-4 text-indigo-600" />
                  <span>Discord</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <SiGithub className="h-4 w-4" />
                  <span>GitHub</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
}
