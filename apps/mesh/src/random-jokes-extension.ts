const chuckApiRandomJokeEndpoint = "https://api.chucknorris.io/jokes/random";

async function getRandomJoke() {
  const response = await globalThis.fetch(chuckApiRandomJokeEndpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch random Chuck Norris joke");
  }

  return response.json();
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

      return Promise.all(Array.from({ length: count }, () => getRandomJoke()));
    },
  },
};
