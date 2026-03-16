import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type JokesHeaderProps = {
  loading: boolean;
  errorMessage?: string;
  visibleCount: number;
  favoriteCount: number;
  favoritesLimitMessage?: string | null;
  isTimerEnabled: boolean;
  secondsUntilNextTick: number | null;
  onToggleTimer: () => void;
  onRefresh: () => void;
};

export function JokesHeader({
  loading,
  errorMessage,
  visibleCount,
  favoriteCount,
  favoritesLimitMessage,
  isTimerEnabled,
  secondsUntilNextTick,
  onToggleTimer,
  onRefresh,
}: JokesHeaderProps) {
  const favoritesPath = `${import.meta.env.BASE_URL}favorites.html`;

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="grid gap-1">
          <CardTitle className="text-2xl">
            {errorMessage ? "Could not load jokes" : "Chuck Chuckle"}
          </CardTitle>
          <CardDescription>
            {loading
              ? "Loading jokes from Mesh GraphQL..."
              : errorMessage
                ? errorMessage
                : "Powered by GraphQL Mesh, Apollo, and shadcn/ui."}
          </CardDescription>
          {favoritesLimitMessage ? (
            <CardDescription className="text-destructive">{favoritesLimitMessage}</CardDescription>
          ) : null}
        </div>
        {!loading && !errorMessage ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{visibleCount} jokes</Badge>
            <Badge variant="secondary">{favoriteCount}/10 favorites</Badge>
            <Button variant="outline" asChild>
              <a href={favoritesPath}>Favorites</a>
            </Button>
            <Button variant="outline" onClick={onRefresh}>
              Refresh
            </Button>
            <Button variant={isTimerEnabled ? "default" : "secondary"} onClick={onToggleTimer}>
              {isTimerEnabled ? "Stop timer" : "Start timer"}
            </Button>
            {isTimerEnabled && secondsUntilNextTick !== null ? (
              <Badge variant="outline">next in {secondsUntilNextTick}s</Badge>
            ) : null}
          </div>
        ) : null}
      </CardHeader>
      {errorMessage ? (
        <CardContent>
          <Button onClick={onRefresh}>Try again</Button>
        </CardContent>
      ) : null}
    </Card>
  );
}
