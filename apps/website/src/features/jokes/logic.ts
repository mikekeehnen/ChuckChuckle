import type { Joke, Jokes } from "./types";

export function rotateVisibleJokes(previousJokes: Jokes, nextJoke: Joke, maxItems: number): Jokes {
  return [nextJoke, ...previousJokes].slice(0, maxItems);
}
