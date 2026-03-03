"use client";

import { useLocale } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to auto-translate text to the current locale using Google Translate.
 * When locale is "en", returns the original text without fetching.
 */
export function useAutoTranslate(text: string) {
    const [locale] = useLocale();
    const isEnglish = locale === "en";

    const { data: translatedText, isFetching } = useQuery({
        queryKey: ["auto-translate", text?.slice(0, 100), locale],
        queryFn: async () => {
            if (!text) return text;
            const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${locale}&dt=t&q=${encodeURIComponent(text)}`,
            );
            if (!response.ok) return text;
            const data = await response.json();
            return data[0]?.map((part: any) => part[0]).join("") as string;
        },
        enabled: !isEnglish && !!text && text.length > 0,
        staleTime: Infinity,
        retry: 1,
    });

    if (isEnglish) return { text, isFetching: false };
    return { text: translatedText ?? text, isFetching };
}
