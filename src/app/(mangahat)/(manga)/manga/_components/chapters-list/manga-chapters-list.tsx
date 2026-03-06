"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMangaIdChapters,
  getMangaIdChaptersResponse,
} from "@/lib/weebdex/hooks/chapter/chapter";
import { GetMangaIdChaptersParams } from "@/lib/weebdex/model/getMangaIdChaptersParams";
import { Chapter } from "@/lib/weebdex/model";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BugIcon, Filter, ListX, Loader2 } from "lucide-react";
import { useConfig } from "@/hooks/use-config";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { VolumeCard, VolumeGroup } from "./volume-card";
import { ChapterGroup } from "./chapter-card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useIsMounted } from "usehooks-ts";
import useReadingHistoryV2 from "@/hooks/use-reading-history-v2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { GB, FR, SA } from "country-flag-icons/react/3x2";

const LIMIT = 100;

// ── Language options ────────────────────────────────────────────────
const LANGUAGE_OPTIONS = [
  { value: "__any__", label: "anyLanguage", flag: null },
  { value: "en", label: "English", flag: GB },
  { value: "fr", label: "French", flag: FR },
  { value: "ar", label: "Arabic", flag: SA },
] as const;

function groupChaptersByVolume(chapters: Chapter[]): VolumeGroup[] {
  const volumeMap = new Map<string, Map<string, Chapter[]>>();

  for (const chapter of chapters) {
    const volKey = chapter.volume ?? "__no_vol__";
    const chKey = chapter.chapter ?? "__oneshot__";

    if (!volumeMap.has(volKey)) {
      volumeMap.set(volKey, new Map());
    }
    const chMap = volumeMap.get(volKey)!;
    if (!chMap.has(chKey)) {
      chMap.set(chKey, []);
    }
    chMap.get(chKey)!.push(chapter);
  }

  return Array.from(volumeMap.entries()).map(([volKey, chMap]) => ({
    vol: volKey === "__no_vol__" ? undefined : volKey,
    chapters: Array.from(chMap.entries()).map(([chKey, group]) => ({
      chapter: chKey === "__oneshot__" ? undefined : chKey,
      group,
    })) as ChapterGroup[],
  }));
}

/** Extract unique scanlation groups from all fetched chapters */
function extractUniqueGroups(
  chapters: Chapter[],
): { id: string; name: string }[] {
  const map = new Map<string, string>();
  for (const ch of chapters) {
    for (const g of ch.relationships?.groups ?? []) {
      if (g.id && !map.has(g.id)) {
        map.set(g.id, g.name ?? g.id);
      }
    }
  }
  return Array.from(map.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ── Filter bar ──────────────────────────────────────────────────────
interface ChapterFilters {
  language: string; // "__any__" | "en" | "fr" | "ar"
  groupId: string; // "__any__" | group UUID
}

function ChapterFilterBar({
  filters,
  onApply,
  onReset,
  availableGroups,
}: {
  filters: ChapterFilters;
  onApply: (f: ChapterFilters) => void;
  onReset: () => void;
  availableGroups: { id: string; name: string }[];
}) {
  const t = useTranslation();
  const [localLang, setLocalLang] = useState(filters.language);
  const [localGroup, setLocalGroup] = useState(filters.groupId);

  // keep local state in sync when parent resets
  useEffect(() => {
    setLocalLang(filters.language);
    setLocalGroup(filters.groupId);
  }, [filters.language, filters.groupId]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 py-2 px-1" dir="ltr">
      <Filter size={18} className="shrink-0 hidden sm:block text-muted-foreground" />

      {/* Language selector */}
      <Select value={localLang} onValueChange={setLocalLang}>
        <SelectTrigger className="w-full sm:flex-1 min-w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span className="flex items-center gap-2">
                {opt.flag && <opt.flag className="h-4 w-4 shrink-0" />}
                {opt.value === "__any__"
                  ? t.manga.anyLanguage
                  : t.settings[
                  opt.label.toLowerCase() as "english" | "french" | "arabic"
                  ]}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Group selector */}
      <Select value={localGroup} onValueChange={setLocalGroup}>
        <SelectTrigger className="w-full sm:flex-1 min-w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__any__">{t.manga.anyGroup}</SelectItem>
          {availableGroups.map((g) => (
            <SelectItem key={g.id} value={g.id}>
              {g.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onReset();
          }}
        >
          {t.misc.reset}
        </Button>
        <Button
          size="sm"
          onClick={() => onApply({ language: localLang, groupId: localGroup })}
        >
          {t.manga.apply}
        </Button>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────

interface MangaChaptersListProps {
  mangaId: string;
  finalChapter?: string;
  page: number;
  onPageChange: (page: number) => void;
}

export function MangaChaptersList({
  mangaId,
  finalChapter,
  page,
  onPageChange,
}: MangaChaptersListProps) {
  const [config] = useConfig();
  const { history } = useReadingHistoryV2();
  const t = useTranslation();
  const readChapterIds = new Set(
    (history[mangaId]?.chapters ?? []).map((e) => e.chapterId),
  );
  const currentPage = page;
  const setCurrentPage = onPageChange;
  const [volumes, setVolumes] = useState<VolumeGroup[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const isMounted = useIsMounted();

  // ── Filter state ─────────────────────────────────────────────────
  // Default language derived from global Translation Language setting.
  // If settings have multiple languages (e.g. ["en","fr","ar"]), default
  // to "__any__" so all are shown; if a single language, use that one.
  const defaultLanguage =
    config.translatedLanguage.length === 1
      ? config.translatedLanguage[0]
      : "__any__";

  const [appliedFilters, setAppliedFilters] = useState<ChapterFilters>({
    language: defaultLanguage,
    groupId: "__any__",
  });

  // Recompute default when the global setting changes
  useEffect(() => {
    const newDefault =
      config.translatedLanguage.length === 1
        ? config.translatedLanguage[0]
        : "__any__";
    setAppliedFilters((prev) => ({
      ...prev,
      language: newDefault,
    }));
  }, [config.translatedLanguage]);

  // Build the tlang array sent to the API depending on filter
  const effectiveTlang = useMemo(() => {
    if (appliedFilters.language === "__any__") {
      // When "Any Language" is selected, still respect global setting
      return config.translatedLanguage;
    }
    return [appliedFilters.language];
  }, [appliedFilters.language, config.translatedLanguage]);

  // Build the group filter array sent to the API
  const effectiveGroup = useMemo(() => {
    if (appliedFilters.groupId === "__any__") return undefined;
    return [appliedFilters.groupId];
  }, [appliedFilters.groupId]);

  const params: GetMangaIdChaptersParams = {
    limit: LIMIT,
    page: currentPage,
    tlang: effectiveTlang,
    group: effectiveGroup,
  };

  const { data, error, isLoading } = useQuery<getMangaIdChaptersResponse>({
    enabled: isMounted(),
    queryKey: [
      `weebdex-chapters-${mangaId}`,
      mangaId,
      currentPage,
      effectiveTlang,
      effectiveGroup,
    ],
    queryFn: ({ signal }) => getMangaIdChapters(mangaId, params, { signal }),
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // ── Available groups (extracted from response) ───────────────────
  const availableGroups = useMemo(
    () => extractUniqueGroups(data?.data?.data ?? []),
    [data],
  );

  useEffect(() => {
    if (data?.status === 200 && data.data?.data) {
      setVolumes(groupChaptersByVolume(data.data.data));
      setTotalPages(Math.ceil((data.data.total ?? 0) / LIMIT));
    }
  }, [data]);

  // ── Handlers ─────────────────────────────────────────────────────
  const handleApplyFilters = useCallback(
    (f: ChapterFilters) => {
      setAppliedFilters(f);
      setCurrentPage(1); // reset to first page on filter change
    },
    [setCurrentPage],
  );

  const handleResetFilters = useCallback(() => {
    const resetLang =
      config.translatedLanguage.length === 1
        ? config.translatedLanguage[0]
        : "__any__";
    setAppliedFilters({ language: resetLang, groupId: "__any__" });
    setCurrentPage(1);
  }, [config.translatedLanguage, setCurrentPage]);

  // ── Render ───────────────────────────────────────────────────────
  const filterBar = (
    <ChapterFilterBar
      filters={appliedFilters}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
      availableGroups={availableGroups}
    />
  );

  if (!isMounted() || isLoading)
    return (
      <>
        {filterBar}
        <div className="flex justify-center items-center w-full h-16">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      </>
    );

  if (error || (data && data.status !== 200))
    return (
      <>
        {filterBar}
        <Empty className="bg-muted/30 h-full mt-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BugIcon />
            </EmptyMedia>
            <EmptyTitle>An error occurred 🤪</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              An error occurred, try refreshing the page
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </>
    );

  if (!data?.data?.data || data.data.data.length === 0)
    return (
      <>
        {filterBar}
        <Empty className="bg-muted/30 h-full mt-2">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListX />
            </EmptyMedia>
            <EmptyTitle>No chapters found</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              This manga has no chapters or no chapters matching your selected
              language
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </>
    );

  return (
    <>
      {filterBar}

      <div className="flex flex-col gap-0">
        {volumes.map((vol) => (
          <VolumeCard
            key={vol.vol ?? "__no_vol__"}
            volume={vol}
            finalChapter={finalChapter}
            readChapterIds={readChapterIds}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              className="w-8 h-8"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {totalPages <= 7 ? (
              Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    className="w-8 h-8"
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : (
              <>
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        className="w-8 h-8"
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && <PaginationEllipsis />}
                  </>
                )}

                {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                  .filter((p) => p >= 1 && p <= totalPages)
                  .map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        className="w-8 h-8"
                        isActive={currentPage === p}
                        onClick={() => setCurrentPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationLink
                        className="w-8 h-8"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
              </>
            )}

            <PaginationNext
              className="w-8 h-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
