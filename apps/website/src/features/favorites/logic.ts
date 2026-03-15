type FavoriteLike = {
  id: string;
};

type ToggleFavoritesResult<T extends FavoriteLike> = {
  nextFavorites: T[];
  wasUpdated: boolean;
};

export function toggleFavoriteInList<T extends FavoriteLike>(
  favorites: T[],
  nextFavorite: T,
  maxFavorites: number,
): ToggleFavoritesResult<T> {
  const alreadyFavorite = favorites.some((favorite) => favorite.id === nextFavorite.id);

  if (alreadyFavorite) {
    return {
      nextFavorites: favorites.filter((favorite) => favorite.id !== nextFavorite.id),
      wasUpdated: true,
    };
  }

  if (favorites.length >= maxFavorites) {
    return {
      nextFavorites: favorites,
      wasUpdated: false,
    };
  }

  return {
    nextFavorites: [nextFavorite, ...favorites],
    wasUpdated: true,
  };
}

export function removeFavoriteFromList<T extends FavoriteLike>(
  favorites: T[],
  favoriteId: string,
): T[] {
  return favorites.filter((favorite) => favorite.id !== favoriteId);
}
