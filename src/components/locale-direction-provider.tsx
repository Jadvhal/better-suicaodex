"use client";

import { useEffect } from "react";
import { useLocale, isRTL } from "@/lib/i18n";

/**
 * Dynamically sets the `dir` and `lang` attributes on <html>
 * based on the current locale. For Arabic, sets dir="rtl"
 * which mirrors the entire page layout.
 */
export function LocaleDirectionProvider() {
    const [locale] = useLocale();

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("lang", locale);
        html.setAttribute("dir", isRTL(locale) ? "rtl" : "ltr");
    }, [locale]);

    return null;
}
