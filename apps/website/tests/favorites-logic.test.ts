import { expect, test } from "vite-plus/test";

import { removeFavoriteFromList, toggleFavoriteInList } from "../src/features/favorites/logic.js";

type Favorite = { id: string; label: string };

function createFavorite(id: string): Favorite {
  return { id, label: `favorite ${id}` };
}

test("toggleFavoriteInList prepends new favorite", () => {
  const favorites = [createFavorite("a"), createFavorite("b")];

  const result = toggleFavoriteInList(favorites, createFavorite("new"), 10);

  expect(result.wasUpdated).toBe(true);
  expect(result.nextFavorites.map((favorite) => favorite.id)).toEqual(["new", "a", "b"]);
});

test("toggleFavoriteInList removes favorite when already in list", () => {
  const favorites = [createFavorite("a"), createFavorite("b")];

  const result = toggleFavoriteInList(favorites, createFavorite("a"), 10);

  expect(result.wasUpdated).toBe(true);
  expect(result.nextFavorites.map((favorite) => favorite.id)).toEqual(["b"]);
});

test("toggleFavoriteInList rejects addition when list is at max", () => {
  const favorites = [createFavorite("1"), createFavorite("2")];

  const result = toggleFavoriteInList(favorites, createFavorite("3"), 2);

  expect(result.wasUpdated).toBe(false);
  expect(result.nextFavorites).toEqual(favorites);
});

test("removeFavoriteFromList removes by id", () => {
  const favorites = [createFavorite("a"), createFavorite("b"), createFavorite("c")];

  const result = removeFavoriteFromList(favorites, "b");

  expect(result.map((favorite) => favorite.id)).toEqual(["a", "c"]);
});
