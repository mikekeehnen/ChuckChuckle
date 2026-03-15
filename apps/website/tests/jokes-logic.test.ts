import { expect, test } from "vite-plus/test";

import { rotateVisibleJokes } from "../src/features/jokes/logic.js";

type JokeItem = Parameters<typeof rotateVisibleJokes>[0][number];

function createJoke(id: string): JokeItem {
  return {
    __typename: "ChuckJoke",
    id,
    value: `joke ${id}`,
    url: `https://example.com/${id}`,
    icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    created_at: "2020-01-01",
    updated_at: "2020-01-01",
    categories: [],
  };
}

test("rotateVisibleJokes prepends new joke", () => {
  const previous = [createJoke("a"), createJoke("b")];

  const result = rotateVisibleJokes(previous, createJoke("new"), 10);

  expect(result.map((joke) => joke.id)).toEqual(["new", "a", "b"]);
});

test("rotateVisibleJokes removes oldest when max exceeded", () => {
  const previous = [
    createJoke("1"),
    createJoke("2"),
    createJoke("3"),
    createJoke("4"),
    createJoke("5"),
  ];

  const result = rotateVisibleJokes(previous, createJoke("new"), 5);

  expect(result.map((joke) => joke.id)).toEqual(["new", "1", "2", "3", "4"]);
});

test("rotateVisibleJokes does not mutate previous jokes", () => {
  const previous = [createJoke("a"), createJoke("b")];
  const previousSnapshot = [...previous];

  rotateVisibleJokes(previous, createJoke("new"), 10);

  expect(previous).toEqual(previousSnapshot);
});
