"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { en, type TranslationKeys } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

export type Locale = "en" | "fr" | "ar";

const translations: Record<Locale, TranslationKeys> = { en, fr, ar };

const localeAtom = atomWithStorage<Locale>("ui-locale", "en");

export function useLocale() {
    return useAtom(localeAtom);
}

export function useTranslation(): TranslationKeys {
    const [locale] = useAtom(localeAtom);
    return translations[locale] ?? en;
}

export function getTranslation(locale: Locale): TranslationKeys {
    return translations[locale] ?? en;
}

export function isRTL(locale: Locale): boolean {
    return locale === "ar";
}

export { en, fr, ar };
export type { TranslationKeys };
