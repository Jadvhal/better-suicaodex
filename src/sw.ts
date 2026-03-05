/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, ExpirationPlugin, NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Do not cache weebdex API calls (always fetch fresh)
    {
      matcher: ({ url }) =>
        url.hostname === "localhost" && url.port === "3637" &&
        !url.pathname.startsWith("/covers/"),
      handler: new NetworkOnly(),
    },
    // Do not cache internal API routes (comments, auth, etc.)
    {
      matcher: ({ url, sameOrigin }) =>
        sameOrigin && url.pathname.startsWith("/api/"),
      handler: new NetworkOnly(),
    },
    // Cache cover images from weebdex proxy (CacheFirst, 7 days, max 1000 items)
    {
      matcher: ({ url }) =>
        url.hostname === "localhost" && url.port === "3637" &&
        url.pathname.startsWith("/covers/"),
      handler: new CacheFirst({
        cacheName: "weebdex-covers",
        // Force CORS mode to avoid opaque response (status 0) from no-cors requests
        fetchOptions: {
          mode: "cors",
          credentials: "omit",
        },
        plugins: [
          new ExpirationPlugin({
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 24 * 7,
            purgeOnQuotaError: true,
          }),
          {
            // Do not cache error images (< 1KB) or status !== 200
            async cacheWillUpdate({ response }) {
              try {
                if (response.status !== 200) return null;
                const blob = await response.clone().blob();
                if (blob.size < 1024) return null;
              } catch {
                return null;
              }
              return response;
            },
          },
        ],
      }),
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
