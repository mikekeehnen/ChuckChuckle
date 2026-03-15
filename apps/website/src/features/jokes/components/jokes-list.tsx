import type { RandomJokesQuery } from "contracts";

import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";

type JokesListProps = {
  jokes: RandomJokesQuery["randomJokes"];
};

export function JokesList({ jokes }: JokesListProps) {
  return (
    <ol className="grid gap-3">
      {jokes.map((joke, index) => (
        <li key={`${joke.id ?? "unknown"}-${index}`}>
          <Card size="sm">
            <CardContent className="grid gap-2">
              <p className="text-sm leading-relaxed">{joke.value}</p>
              <Separator />
              <p className="text-xs text-muted-foreground">id: {joke.id ?? "unknown"}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  );
}
