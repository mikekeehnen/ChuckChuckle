import { Trash2 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import type { FavoriteJoke } from "../cache";

type FavoritesListProps = {
  favorites: FavoriteJoke[];
  onRemoveFavorite: (jokeId: string) => void;
};

export function FavoritesList({ favorites, onRemoveFavorite }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <Card>
        <CardContent className="text-sm text-muted-foreground">
          No favorites yet. Go back to jokes and add some.
        </CardContent>
      </Card>
    );
  }

  return (
    <ol className="grid gap-3">
      {favorites.map((joke) => (
        <li key={joke.id}>
          <Card size="sm">
            <CardContent className="grid gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed">{joke.value}</p>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => onRemoveFavorite(joke.id)}
                  aria-label="Remove favorite"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">id: {joke.id}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  );
}
