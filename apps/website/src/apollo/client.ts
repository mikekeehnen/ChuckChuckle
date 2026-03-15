import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { hydrateFavoritesCache } from "../features/favorites/cache";
import { persistApolloCache, restoreApolloCache } from "./persistence";

const meshEndpoint = import.meta.env.VITE_MESH_ENDPOINT ?? "http://localhost:4000/api/graphql";

function createApolloClient() {
  const cache = new InMemoryCache();

  if (typeof window !== "undefined") {
    const persistedCache = restoreApolloCache();
    if (persistedCache) {
      cache.restore(persistedCache);
    }
  }

  const client = new ApolloClient({
    cache,
    link: new HttpLink({
      uri: meshEndpoint,
    }),
  });

  if (typeof window !== "undefined") {
    hydrateFavoritesCache(client);
    persistApolloCache(client);
  }

  return client;
}

export const apolloClient = createApolloClient();
