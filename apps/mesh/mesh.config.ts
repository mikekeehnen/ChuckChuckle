import { defineConfig } from "@graphql-mesh/compose-cli";
import { loadJSONSchemaSubgraph } from "@omnigraph/json-schema";

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadJSONSchemaSubgraph("ChuckApi", {
        endpoint: "https://api.chucknorris.io",
        operations: [
          {
            type: "Query",
            field: "randomJoke",
            path: "/jokes/random",
            method: "GET",
            responseSchema: "./src/schemas/chuck-joke.schema.json",
            responseTypeName: "ChuckJoke",
          },
        ],
      }),
    },
  ],
});
