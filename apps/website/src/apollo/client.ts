import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const meshEndpoint = import.meta.env.VITE_MESH_ENDPOINT ?? "http://localhost:4000/api/graphql";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: meshEndpoint,
  }),
});
