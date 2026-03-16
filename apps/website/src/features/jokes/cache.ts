import type { ApolloClient } from "@apollo/client";
import { RandomJokesDocument } from "contracts";

import { persistApolloCache } from "../../apollo/persistence";
import { INITIAL_JOKE_COUNT } from "./constants";
import { rotateVisibleJokes } from "./logic";
import type { Joke, Jokes } from "./types";

const jokesQueryVariables = { count: INITIAL_JOKE_COUNT };

export function readVisibleJokesFromCache(apolloClient: ApolloClient<object>): Jokes {
  const cachedData = apolloClient.readQuery({
    query: RandomJokesDocument,
    variables: jokesQueryVariables,
  });

  return cachedData?.randomJokes ?? [];
}

export function prependJokeToVisibleCache(apolloClient: ApolloClient<object>, joke: Joke) {
  const previousJokes = readVisibleJokesFromCache(apolloClient);
  const nextJokes = rotateVisibleJokes(previousJokes, joke, INITIAL_JOKE_COUNT);

  apolloClient.writeQuery({
    query: RandomJokesDocument,
    variables: jokesQueryVariables,
    data: {
      randomJokes: nextJokes,
    },
  });

  persistApolloCache(apolloClient);
}
