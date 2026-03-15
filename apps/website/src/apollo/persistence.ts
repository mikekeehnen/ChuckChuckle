import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";

const APOLLO_CACHE_STORAGE_KEY = "chuck-chuckle:apollo-cache";

export function restoreApolloCache(): NormalizedCacheObject | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawCache = window.localStorage.getItem(APOLLO_CACHE_STORAGE_KEY);
  if (!rawCache) {
    return null;
  }

  try {
    return JSON.parse(rawCache) as NormalizedCacheObject;
  } catch {
    return null;
  }
}

export function persistApolloCache(apolloClient: ApolloClient<object>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    APOLLO_CACHE_STORAGE_KEY,
    JSON.stringify(apolloClient.cache.extract()),
  );
}
