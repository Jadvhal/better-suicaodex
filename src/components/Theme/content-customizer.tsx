"use client";

import * as React from "react";
import { Eye, EyeOff, Globe, Languages, Repeat, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import "@/styles/mdx.css";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ThemeWrapper } from "./theme-wrapper";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { SidebarMenuButton } from "../ui/sidebar";
import { GB, FR, SA } from "country-flag-icons/react/3x2";
import { useTranslation, useLocale, type Locale } from "@/lib/i18n";

export function ContentCustomizer() {
  const [mounted, setMounted] = React.useState(false);
  const t = useTranslation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Drawer>
        <DrawerTrigger asChild>
          <SidebarMenuButton asChild tooltip={t.settings.content} className="md:hidden">
            <div>
              <SlidersHorizontal />
              <span>{t.settings.content}</span>
            </div>
          </SidebarMenuButton>
        </DrawerTrigger>
        <DrawerTitle className="hidden"></DrawerTitle>
        <DrawerDescription className="hidden"></DrawerDescription>
        <DrawerContent className="p-6 pt-0">
          <Customizer />
        </DrawerContent>
      </Drawer>
      <div className="hidden items-center md:flex grow">
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              asChild
              tooltip={t.settings.content}
              className="cursor-pointer"
            >
              <div>
                <SlidersHorizontal />
                <span>{t.settings.content}</span>
              </div>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="z-40 w-[340px] rounded-xl bg-white p-6 dark:bg-zinc-950 mr-2"
          >
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function Customizer() {
  const [mounted, setMounted] = React.useState(false);
  const [config, setConfig] = useConfig();
  const t = useTranslation();
  const [locale, setLocale] = useLocale();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeWrapper
      defaultTheme="zinc"
      className="flex flex-col space-y-4 md:space-y-6"
    >
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            {t.settings.contentCustomize}
          </div>
          <div className="text-xs text-muted-foreground">
            {t.settings.filterByPreference}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            setConfig({
              ...config,
              translatedLanguage: ["en"],
              r18: false,
            });
          }}
        >
          <Repeat />
          <span className="sr-only">{t.misc.reset}</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        {/* UI Language */}
        <div className="space-y-1.5">
          <Label className="font-semibold">{t.settings.uiLanguage}</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                {(["en", "fr", "ar"] as Locale[]).map((lang) => (
                  <Button
                    key={lang}
                    variant="outline"
                    size="sm"
                    onClick={() => setLocale(lang)}
                    className={cn(
                      "justify-start",
                      locale === lang && "border-2 border-primary!"
                    )}
                  >
                    {lang === "en" && <GB className="h-5 w-5" />}
                    {lang === "fr" && <FR className="h-5 w-5" />}
                    {lang === "ar" && <SA className="h-5 w-5" />}
                    {lang === "en" ? t.settings.english : lang === "fr" ? t.settings.french : t.settings.arabic}
                  </Button>
                ))}
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>

        {/* Translation Language (for manga content from MangaDex) */}
        <div className="space-y-1.5">
          <Label className="font-semibold">{t.settings.translationLanguage}</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      translatedLanguage: ["en"],
                    });
                  }}
                  className={cn(
                    "justify-start",
                    JSON.stringify(config.translatedLanguage) ===
                    JSON.stringify(["en"]) && "border-2 border-primary!"
                  )}
                >
                  <GB className="h-5 w-5" />
                  {t.settings.english}
                </Button>

                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      translatedLanguage: ["fr"],
                    });
                  }}
                  className={cn(
                    "justify-start",
                    JSON.stringify(config.translatedLanguage) ===
                    JSON.stringify(["fr"]) && "border-2 border-primary!"
                  )}
                >
                  <FR className="h-5 w-5" />
                  {t.settings.french}
                </Button>

                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    setConfig({
                      ...config,
                      translatedLanguage: ["ar"],
                    });
                  }}
                  className={cn(
                    "justify-start",
                    JSON.stringify(config.translatedLanguage) ===
                    JSON.stringify(["ar"]) && "border-2 border-primary!"
                  )}
                >
                  <SA className="h-5 w-5" />
                  {t.settings.arabic}
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="font-semibold">{t.settings.r18}</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() =>
                    setConfig({
                      ...config,
                      r18: true,
                    })
                  }
                  className={cn(config.r18 && "border-2 border-primary!")}
                >
                  <Eye className="mr-1 -translate-x-1" />
                  {t.settings.show}
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() =>
                    setConfig({
                      ...config,
                      r18: false,
                    })
                  }
                  className={cn(!config.r18 && "border-2 border-primary!")}
                >
                  <EyeOff className="mr-1 -translate-x-1" />
                  {t.settings.hide}
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
