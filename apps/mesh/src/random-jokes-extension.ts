import { type ChuckJoke } from "contracts/generated";

const chuckApiRandomJokeEndpoint = "https://api.chucknorris.io/jokes/random";

async function getRandomJoke(): Promise<ChuckJoke | null> {
  const response = await globalThis.fetch(chuckApiRandomJokeEndpoint, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const joke = await response.json();

  if (!joke || typeof joke !== "object") {
    return null;
  }

  const { categories, created_at, icon_url, id, updated_at, url, value } = joke as Record<
    string,
    unknown
  >;

  if (
    typeof id !== "string" ||
    typeof value !== "string" ||
    typeof url !== "string" ||
    typeof icon_url !== "string" ||
    typeof created_at !== "string" ||
    typeof updated_at !== "string" ||
    !Array.isArray(categories)
  ) {
    return null;
  }

  return {
    id,
    value,
    url,
    icon_url,
    created_at,
    updated_at,
    categories: categories.filter((category): category is string => typeof category === "string"),
  };
}

export const randomJokesTypeDefs = /* GraphQL */ `
  extend type Query {
    randomJokes(count: Int!): [ChuckJoke!]!
  }
`;

export const randomJokesResolvers = {
  Query: {
    randomJokes: async (_root: unknown, args: { count: number }) => {
      const count = Math.max(1, Math.min(args.count, 10));
      const jokes = await Promise.all(Array.from({ length: count }, () => getRandomJoke()));

      return jokes.filter((joke): joke is ChuckJoke => joke !== null);
    },
  },
};
