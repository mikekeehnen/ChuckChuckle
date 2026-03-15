import type { RandomJokesQuery } from "contracts";
import { Heart } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";

type JokesListProps = {
  jokes: RandomJokesQuery["randomJokes"];
  favoriteIds: Set<string>;
  onToggleFavorite: (joke: RandomJokesQuery["randomJokes"][number]) => void;
};

export function JokesList({ jokes, favoriteIds, onToggleFavorite }: JokesListProps) {
  return (
    <ol className="grid gap-3">
      {jokes.map((joke, index) => (
        <li key={`${joke.id ?? "unknown"}-${index}`}>
          <Card size="sm">
            <CardContent className="grid gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed">{joke.value}</p>
                <Button
                  variant={favoriteIds.has(joke.id) ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => onToggleFavorite(joke)}
                  aria-label={
                    favoriteIds.has(joke.id) ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart className="size-4" />
                </Button>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">id: {joke.id ?? "unknown"}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  );
}
