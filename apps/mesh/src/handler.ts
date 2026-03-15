import { createGatewayRuntime } from "@graphql-hive/gateway";
import { randomJokesResolvers, randomJokesTypeDefs } from "./random-jokes-extension";

const supergraphPath = new URL("../supergraph.graphql", import.meta.url).pathname;

const gateway = createGatewayRuntime({
  supergraph: supergraphPath,
  graphqlEndpoint: "/api/graphql",
  healthCheckEndpoint: "/api/health",
  cors: {
    origin: "*",
  },
  graphiql: true,
  additionalTypeDefs: randomJokesTypeDefs,
  additionalResolvers: randomJokesResolvers,
});

export function fetch(request: Request): Promise<Response> | Response {
  return gateway.fetch(request);
}

export default fetch;
