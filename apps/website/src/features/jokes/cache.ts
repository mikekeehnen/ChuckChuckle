import type { ApolloClient } from "@apollo/client";
import { RandomJokesDocument, type RandomJokeQuery, type RandomJokesQuery } from "contracts";

import { INITIAL_JOKE_COUNT } from "./constants";

const jokesQueryVariables = { count: INITIAL_JOKE_COUNT };

export function readVisibleJokesFromCache(
  apolloClient: ApolloClient<object>,
): RandomJokesQuery["randomJokes"] {
  const cachedData = apolloClient.readQuery({
    query: RandomJokesDocument,
    variables: jokesQueryVariables,
  });

  return cachedData?.randomJokes ?? [];
}

export function prependJokeToVisibleCache(
  apolloClient: ApolloClient<object>,
  joke: NonNullable<RandomJokeQuery["randomJoke"]>,
) {
  const previousJokes = readVisibleJokesFromCache(apolloClient);
  const nextJokes = [joke, ...previousJokes].slice(0, INITIAL_JOKE_COUNT);

  apolloClient.writeQuery({
    query: RandomJokesDocument,
    variables: jokesQueryVariables,
    data: {
      randomJokes: nextJokes,
    },
  });
}
