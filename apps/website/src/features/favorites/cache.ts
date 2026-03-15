import type { ApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";
import type { RandomJokesQuery } from "contracts";

import { persistApolloCache } from "../../apollo/persistence";
import { MAX_FAVORITES } from "./constants";
import { loadFavoritesFromStorage, saveFavoritesToStorage } from "./storage";

export type FavoriteJoke = RandomJokesQuery["randomJokes"][number];

export const FAVORITES_QUERY = gql`
  query Favorites {
    favorites @client {
      __typename
      id
      value
      url
      icon_url
      created_at
      updated_at
      categories
    }
  }
`;

type FavoritesQueryResult = {
  favorites: FavoriteJoke[];
};

export function readFavoritesFromCache(apolloClient: ApolloClient<object>): FavoriteJoke[] {
  const cachedData = apolloClient.readQuery<FavoritesQueryResult>({
    query: FAVORITES_QUERY,
  });

  return cachedData?.favorites ?? [];
}

export function writeFavoritesToCache(
  apolloClient: ApolloClient<object>,
  favorites: FavoriteJoke[],
) {
  apolloClient.writeQuery<FavoritesQueryResult>({
    query: FAVORITES_QUERY,
    data: {
      favorites,
    },
  });

  saveFavoritesToStorage(favorites);
  persistApolloCache(apolloClient);
}

export function hydrateFavoritesCache(apolloClient: ApolloClient<object>) {
  const favorites = loadFavoritesFromStorage();
  writeFavoritesToCache(apolloClient, favorites);
}

export function isFavorite(favorites: FavoriteJoke[], jokeId: string): boolean {
  return favorites.some((favoriteJoke) => favoriteJoke.id === jokeId);
}

export function toggleFavoriteInCache(
  apolloClient: ApolloClient<object>,
  joke: FavoriteJoke,
): boolean {
  if (!joke.id) {
    return false;
  }

  const favorites = readFavoritesFromCache(apolloClient);

  if (isFavorite(favorites, joke.id)) {
    const nextFavorites = favorites.filter((favoriteJoke) => favoriteJoke.id !== joke.id);
    writeFavoritesToCache(apolloClient, nextFavorites);
    return true;
  }

  if (favorites.length >= MAX_FAVORITES) {
    return false;
  }

  writeFavoritesToCache(apolloClient, [joke, ...favorites]);
  return true;
}

export function removeFavoriteFromCache(apolloClient: ApolloClient<object>, jokeId: string) {
  const favorites = readFavoritesFromCache(apolloClient);
  const nextFavorites = favorites.filter((favoriteJoke) => favoriteJoke.id !== jokeId);
  writeFavoritesToCache(apolloClient, nextFavorites);
}
