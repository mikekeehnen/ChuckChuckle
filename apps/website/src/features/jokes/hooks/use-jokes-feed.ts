import { useApolloClient, useQuery } from "@apollo/client";
import { RandomJokeDocument, RandomJokesDocument } from "contracts";
import { useCallback, useEffect, useState } from "react";

import { persistApolloCache } from "../../../apollo/persistence";
import { prependJokeToVisibleCache, readVisibleJokesFromCache } from "../cache";
import { INITIAL_JOKE_COUNT, TIMER_INTERVAL_MS } from "../constants";
import { useJokeRotationTimer } from "./use-joke-rotation-timer";

export function useJokesFeed() {
  const apolloClient = useApolloClient();
  const { data, loading, error, refetch } = useQuery(RandomJokesDocument, {
    variables: { count: INITIAL_JOKE_COUNT },
  });
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);

  const tickTimer = useCallback(async () => {
    const result = await apolloClient.query({
      query: RandomJokeDocument,
      fetchPolicy: "network-only",
    });

    const nextJoke = result.data.randomJoke;
    if (!nextJoke) {
      return;
    }

    prependJokeToVisibleCache(apolloClient, nextJoke);
  }, [apolloClient]);

  const { secondsUntilNextTick } = useJokeRotationTimer({
    enabled: isTimerEnabled && !loading && !error,
    intervalMs: TIMER_INTERVAL_MS,
    onTick: tickTimer,
  });

  useEffect(() => {
    if (data?.randomJokes) {
      persistApolloCache(apolloClient);
    }
  }, [apolloClient, data]);

  const refresh = useCallback(() => {
    void refetch().then((result) => {
      if (result.data?.randomJokes) {
        persistApolloCache(apolloClient);
      }
    });
  }, [apolloClient, refetch]);

  const toggleTimer = useCallback(() => {
    setIsTimerEnabled((previousValue) => !previousValue);
  }, []);

  const jokes = data?.randomJokes ?? readVisibleJokesFromCache(apolloClient);

  return {
    jokes,
    loading,
    isError: Boolean(error),
    errorMessage: error?.message,
    isTimerEnabled,
    secondsUntilNextTick,
    toggleTimer,
    refresh,
  };
}
