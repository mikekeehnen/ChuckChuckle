import type { RandomJokesQuery } from "contracts";

import { FAVORITES_STORAGE_KEY } from "./constants";

type FavoriteJoke = RandomJokesQuery["randomJokes"][number];

function isFavoriteJoke(value: unknown): value is FavoriteJoke {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<FavoriteJoke>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.value === "string" &&
    typeof candidate.url === "string" &&
    typeof candidate.icon_url === "string" &&
    typeof candidate.created_at === "string" &&
    typeof candidate.updated_at === "string" &&
    Array.isArray(candidate.categories)
  );
}

export function loadFavoritesFromStorage(): FavoriteJoke[] {
  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isFavoriteJoke);
  } catch {
    return [];
  }
}

export function saveFavoritesToStorage(favorites: FavoriteJoke[]) {
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
