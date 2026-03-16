import { defineConfig } from "@graphql-hive/gateway";
import { randomJokesResolvers, randomJokesTypeDefs } from "./src/random-jokes-extension.js";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  graphqlEndpoint: "/api/graphql",
  healthCheckEndpoint: "/api/health",
  cors: {
    origin: "*",
  },
  maskedErrors: false,
  graphiql: true,
  additionalTypeDefs: randomJokesTypeDefs,
  additionalResolvers: randomJokesResolvers,
});

export default gatewayConfig;
