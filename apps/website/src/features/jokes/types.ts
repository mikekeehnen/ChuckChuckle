import type { RandomJokeQuery } from "contracts";

export type Joke = NonNullable<RandomJokeQuery["randomJoke"]>;
export type Jokes = Joke[];
