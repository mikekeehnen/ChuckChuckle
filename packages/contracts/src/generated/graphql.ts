import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  ObjMap: { input: any; output: any };
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: string; output: string };
  _DirectiveExtensions: { input: any; output: any };
  join__FieldSet: { input: any; output: any };
  link__Import: { input: any; output: any };
};

export type ChuckJoke = {
  __typename?: "ChuckJoke";
  categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  created_at?: Maybe<Scalars["String"]["output"]>;
  icon_url?: Maybe<Scalars["URL"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  updated_at?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["URL"]["output"]>;
  value?: Maybe<Scalars["String"]["output"]>;
};

export type HttpMethod =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

export type Query = {
  __typename?: "Query";
  randomJoke?: Maybe<ChuckJoke>;
  randomJokes: Array<ChuckJoke>;
};

export type QueryRandomJokesArgs = {
  count: Scalars["Int"]["input"];
};

export type Join__Graph = "CHUCK_API";

export type Link__Purpose =
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  | "EXECUTION"
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  | "SECURITY";

export type RandomJokeQueryVariables = Exact<{ [key: string]: never }>;

export type RandomJokeQuery = {
  __typename?: "Query";
  randomJoke?: {
    __typename?: "ChuckJoke";
    id?: string | null;
    value?: string | null;
    url?: string | null;
    icon_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    categories?: Array<string | null> | null;
  } | null;
};

export type RandomJokesQueryVariables = Exact<{
  count: Scalars["Int"]["input"];
}>;

export type RandomJokesQuery = {
  __typename?: "Query";
  randomJokes: Array<{
    __typename?: "ChuckJoke";
    id?: string | null;
    value?: string | null;
    url?: string | null;
    icon_url?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    categories?: Array<string | null> | null;
  }>;
};

export const RandomJokeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomJoke" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomJoke" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "value" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "icon_url" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomJokeQuery, RandomJokeQueryVariables>;
export const RandomJokesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomJokes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "count" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomJokes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "count" },
                value: { kind: "Variable", name: { kind: "Name", value: "count" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "value" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "icon_url" } },
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomJokesQuery, RandomJokesQueryVariables>;
