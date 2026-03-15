import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["../../apps/mesh/supergraph.graphql", "./src/schema-extension.graphql"],
  documents: ["./src/operations/**/*.graphql"],
  config: {
    enumsAsTypes: true,
    scalars: {
      URL: "string",
    },
    useTypeImports: true,
  },
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  ignoreNoDocuments: false,
};

export default config;
