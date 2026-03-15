import { createGatewayRuntime } from "@graphql-hive/gateway";

const supergraphPath = new URL("../supergraph.graphql", import.meta.url).pathname;

const gateway = createGatewayRuntime({
  supergraph: supergraphPath,
  graphqlEndpoint: "/api/graphql",
  healthCheckEndpoint: "/api/health",
  cors: {
    origin: "*",
  },
  graphiql: true,
});

export function fetch(request: Request): Promise<Response> | Response {
  return gateway.fetch(request);
}

export default fetch;
