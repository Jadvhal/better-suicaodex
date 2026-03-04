"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UsePreloadImagesOptions {
  images: string[];
  preloadCount?: number;
  visibilityThreshold?: number;
}

export function usePreloadImages({
  images,
  preloadCount = 5,
  visibilityThreshold = 0.1,
}: UsePreloadImagesOptions) {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  // read latest state without resetting Observer
  const visibleImagesRef = useRef<Set<number>>(new Set());
  // Map tracking observed elements
  const imageRefs = useRef<Map<number, HTMLElement>>(new Map());

  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set(),
  );
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const observerRef = useRef<IntersectionObserver | null>(null);
  const attemptedImagesRef = useRef<Set<string>>(new Set());

  // Sync State -> Ref (Always keep ref latest)
  useEffect(() => {
    visibleImagesRef.current = visibleImages;
  }, [visibleImages]);

  const preloadImage = useCallback((src: string) => {
    // only check Ref
    if (attemptedImagesRef.current.has(src)) return;

    attemptedImagesRef.current.add(src);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      // Functional update; create a new Set to trigger re-render
      setPreloadedImages((prev) => {
        const next = new Set(prev);
        next.add(src);
        return next;
      });
    };

    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      attemptedImagesRef.current.delete(src);
    };
  }, []);

  // Setup Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const newObserver = new IntersectionObserver(
      (entries) => {
        const currentVisible = new Set(visibleImagesRef.current);
        let hasChanges = false;

        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-image-index") ?? "-1",
          );
          if (index === -1) return;

          if (entry.isIntersecting) {
            if (!currentVisible.has(index)) {
              currentVisible.add(index);
              hasChanges = true;
            }
          } else {
            if (currentVisible.has(index)) {
              currentVisible.delete(index);
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          setVisibleImages(currentVisible);
        }
      },
      {
        threshold: visibilityThreshold,
        rootMargin: "100px 0px 400px 0px",
      },
    );

    observerRef.current = newObserver;

    // Re-observe all living nodes
    imageRefs.current.forEach((element) => {
      newObserver.observe(element);
    });

    return () => newObserver.disconnect();
  }, [visibilityThreshold]);

  useEffect(() => {
    if (visibleImages.size === 0) return;

    // find largest visible index
    const maxVisibleIndex = Math.max(...visibleImages);

    const imagesToPreload: string[] = [];
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = maxVisibleIndex + i;
      if (nextIndex < images.length) {
        imagesToPreload.push(images[nextIndex]);
      }
    }

    imagesToPreload.forEach(preloadImage);
  }, [visibleImages, images, preloadCount, preloadImage]);

  const registerImageElement = useCallback(
    (index: number, element: HTMLElement | null) => {
      const observer = observerRef.current;
      if (!observer) return;

      if (element) {
        // cleanup old
        const prevEl = imageRefs.current.get(index);
        if (prevEl) observer.unobserve(prevEl);

        imageRefs.current.set(index, element);
        element.setAttribute("data-image-index", index.toString());
        observer.observe(element);
      } else {
        // React called with null, so clear old elements
        const prevEl = imageRefs.current.get(index);
        if (prevEl) {
          observer.unobserve(prevEl);
          imageRefs.current.delete(index);
        }
      }
    },
    [],
  );

  return {
    registerImageElement,
    markImageAsLoaded: useCallback((index: number) => {
      setLoadedImages((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    }, []),
    isImageLoaded: useCallback(
      (index: number) => loadedImages.has(index),
      [loadedImages],
    ),
    preloadedImages,
    visibleImages,
  };
}
