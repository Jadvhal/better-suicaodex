import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Types ──────────────────────────────────────────────────────────────────
/** Reading mode */
export type ReaderMode =
  | "long-strip"   // Vertical scroll (webtoon)
  | "single"       // Single page - LTR
  | "single-rtl"   // Single page - RTL (Japanese manga)
  | "double";      // Double page - LTR

/** Image display scale */
export type ImageScale =
  | "original"      // Original size
  | "limit-all"     // Fit screen (max-w + max-h)
  | "limit-width"   // Fit width
  | "limit-height"  // Fit height
  | "stretch-width" // Stretch width
  | "stretch-height"; // Stretch height

// ── Helper ─────────────────────────────────────────────────────────────────
/** Returns Tailwind classes for <img> based on the selected scale */
export function getImageScaleClasses(scale: ImageScale): string {
  switch (scale) {
    case "original": return "w-auto h-auto";
    case "limit-all": return "w-auto h-auto max-w-full max-h-dvh";
    case "limit-width": return "h-auto max-w-full";
    case "limit-height": return "w-auto max-h-dvh";
    case "stretch-width": return "w-full h-auto";
    case "stretch-height": return "w-auto h-dvh";
  }
}

/** English labels for each scale */
export const IMAGE_SCALE_LABELS: Record<ImageScale, string> = {
  "original": "Original Size",
  "limit-all": "Fit Screen",
  "limit-width": "Fit Width",
  "limit-height": "Fit Height",
  "stretch-width": "Stretch Width",
  "stretch-height": "Stretch Height",
};

/** English labels for each mode */
export const READER_MODE_LABELS: Record<ReaderMode, string> = {
  "long-strip": "Long Strip",
  "single": "Single Page (LTR)",
  "single-rtl": "Single Page (RTL)",
  "double": "Double Page",
};

// ── Store ──────────────────────────────────────────────────────────────────
interface ReaderState {
  mode: ReaderMode;
  scale: ImageScale;
  imageGap: number;    // gap (px) between images in long-strip
  header: boolean;     // show/hide header bar
  spreadOffset: number; // offset for double page mode (0-3)
}

interface ReaderActions {
  setMode: (mode: ReaderMode) => void;
  setScale: (scale: ImageScale) => void;
  setImageGap: (gap: number) => void;
  setHeader: (header: boolean) => void;
  setSpreadOffset: (offset: number) => void;
}

const DEFAULT_STATE: ReaderState = {
  mode: "long-strip",
  scale: "limit-width",
  imageGap: 4,
  header: false,
  spreadOffset: 0,
};

export const useReaderStore = create<ReaderState & ReaderActions>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      setMode: (mode) => set({ mode }),
      setScale: (scale) => set({ scale }),
      setImageGap: (gap) => set({ imageGap: gap }),
      setHeader: (header) => set({ header }),
      setSpreadOffset: (offset) => set({ spreadOffset: offset }),
    }),
    { name: "reader-config" },
  ),
);
