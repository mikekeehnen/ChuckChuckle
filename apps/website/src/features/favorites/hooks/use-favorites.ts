import { useApolloClient, useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";

import {
  FAVORITES_QUERY,
  isFavorite,
  readFavoritesFromCache,
  removeFavoriteFromCache,
  toggleFavoriteInCache,
} from "../cache";
import { MAX_FAVORITES } from "../constants";
import type { Joke } from "../../jokes/types";

type FavoriteJoke = Joke;
type FavoritesQueryResult = {
  favorites: FavoriteJoke[];
};

export function useFavorites() {
  const apolloClient = useApolloClient();
  const [limitErrorMessage, setLimitErrorMessage] = useState<string | null>(null);

  const { data } = useQuery<FavoritesQueryResult>(FAVORITES_QUERY);
  const favorites = data?.favorites ?? readFavoritesFromCache(apolloClient);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favoriteJoke) => favoriteJoke.id)),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (joke: FavoriteJoke) => {
      const isAddedOrRemoved = toggleFavoriteInCache(apolloClient, joke);
      if (isAddedOrRemoved) {
        setLimitErrorMessage(null);
        return;
      }

      setLimitErrorMessage(`You can only keep ${MAX_FAVORITES} favorites.`);
    },
    [apolloClient],
  );

  const removeFavorite = useCallback(
    (jokeId: string) => {
      removeFavoriteFromCache(apolloClient, jokeId);
      setLimitErrorMessage(null);
    },
    [apolloClient],
  );

  const isJokeFavorite = useCallback(
    (jokeId: string) => {
      return isFavorite(favorites, jokeId);
    },
    [favorites],
  );

  return {
    favorites,
    favoriteIds,
    favoriteCount: favorites.length,
    isJokeFavorite,
    toggleFavorite,
    removeFavorite,
    limitErrorMessage,
  };
}
