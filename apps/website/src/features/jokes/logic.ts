import type { RandomJokeQuery, RandomJokesQuery } from "contracts";

export function rotateVisibleJokes(
  previousJokes: RandomJokesQuery["randomJokes"],
  nextJoke: NonNullable<RandomJokeQuery["randomJoke"]>,
  maxItems: number,
): RandomJokesQuery["randomJokes"] {
  return [nextJoke, ...previousJokes].slice(0, maxItems);
}
