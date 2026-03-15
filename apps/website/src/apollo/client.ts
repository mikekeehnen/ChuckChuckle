import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { hydrateFavoritesCache } from "../features/favorites/cache";

const meshEndpoint = import.meta.env.VITE_MESH_ENDPOINT ?? "http://localhost:4000/api/graphql";

function createApolloClient() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: meshEndpoint,
    }),
  });

  if (typeof window !== "undefined") {
    hydrateFavoritesCache(client);
  }

  return client;
}

export const apolloClient = createApolloClient();
